import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RHFSelect, RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { Upload } from "../../../components/upload";
import {
  createCategory,
  updateCategory,
} from "../../../redux/slices/categorySlice";

const Form = ({ handleClose, data, isEdit = false, setActiveTab }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [photo, setPhoto] = useState(null);
  const [mainCategoryData, setMainCategoryData] = useState([]);
  const [filteredSubCategoryData, setFilteredSubCategoryData] = useState([]);

  const categories = useSelector((state) => state.category.categories);
  const createCategoryLoading = useSelector(
    (state) => state.category.isLoading
  );
  const mainCategories = useSelector((state) => state.category.mainCategories);

  const Schema = Yup.object().shape({
    name: Yup.string().required("Category name is required"),
  });

  const defaultValues = useMemo(
    () => ({
      name: data?.name,
      photo: data?.photo,
    }),
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;
  const selectedMainCategory = watch("main_category_id");

  React.useEffect(() => {
    const mainCategory = mainCategories?.map((category) => ({
      label: category?.name,
      value: category?.id,
    }));

    setMainCategoryData(mainCategory);
  }, [mainCategories]);

  React.useEffect(() => {
    if (selectedMainCategory) {
      const filteredSubCategories = categories?.data
        ?.filter((category) => category.parent_id === selectedMainCategory)
        ?.map((category) => ({
          label: category?.name,
          value: category?.id,
        }));

      setFilteredSubCategoryData(filteredSubCategories);
      setValue("sub_category_id", ""); // Clear sub-category selection when main category changes
    }
  }, [selectedMainCategory, categories, setValue]);

  const handleDropPhoto = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setPhoto(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
      setPhoto(acceptedFiles[0]);
    }
  }, []);

  const onCreateCategory = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.main_category_id || values.sub_category_id) {
      formData.append(
        "parent_id",
        values.sub_category_id || values.main_category_id
      );
    }
    if (photo) {
      formData.append("photo", photo);
    }
    dispatch(
      createCategory({
        data: formData,
        enqueueSnackbar,
        handleClose,
        setActiveTab,
        activeTab: values.main_category_id,
      })
    );
  };

  const onUpdateCategory = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);

    if (values.main_category_id || values.sub_category_id) {
      formData.append(
        "parent_id",
        values.sub_category_id || values.main_category_id
      );
    }
    if (photo) {
      formData.append("photo", photo);
    }
    dispatch(
      updateCategory({
        data: formData,
        enqueueSnackbar,
        handleClose,
        id: data?.slug,
      })
    );
  };

  return (
    <Box p={3}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(isEdit ? onUpdateCategory : onCreateCategory)}
      >
        <Stack flexDirection={"row"} justifyContent={"center"} mb={2}></Stack>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: "repeat(1, 1fr)", sm: "repeat(1, 1fr)" }}
        >
          <RHFTextField name={"name"} label={"Category name *"} />
          <RHFSelect name={"main_category_id"} label="Select main category">
            {mainCategoryData?.map((category, index) => (
              <MenuItem value={category?.value} key={index}>
                <span>{category?.label}</span>
              </MenuItem>
            ))}
          </RHFSelect>

          <RHFSelect
            name={"sub_category_id"}
            label="Select sub-category"
            disabled={!selectedMainCategory}
          >
            {filteredSubCategoryData?.map((category, index) => (
              <MenuItem value={category?.value} key={index}>
                <span>{category?.label}</span>
              </MenuItem>
            ))}
          </RHFSelect>
        </Box>

        <Box mt={3}>
          <Upload
            isAvatar={false}
            text={"Upload picture"}
            file={photo || defaultValues.photo}
            name="photo"
            accept="image/*"
            maxSize={1}
            onDrop={handleDropPhoto}
          />
        </Box>

        <Stack mt={2} alignItems={"end"}>
          <LoadingButton
            loading={createCategoryLoading}
            disabled={createCategoryLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? "Update Category" : "Create Category"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
