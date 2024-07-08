import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import * as Yup from "yup";
import { RHFEditor, RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { Upload } from "../../../components/upload";
import { createBlog, updateBlog } from "../../../redux/slices/blogSlice";
import { fetchCategories } from "../../../redux/slices/categorySlice";
import { fetchInclusive } from "../../../redux/slices/inclusiveSlice";
import DynamicForm from "./DynamicForm";

const Form = ({
  handleClose,
  data,
  isEdit = false,
  refresh,
  setRefresh,
  isView = false,
}) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [photo, setPhoto] = useState(null);

  const [content, setContent] = useState(null);

  // TODO: get the data from slice

  const createProductLoading = useSelector((state) => state.blog.isLoading);
  const categories = useSelector((state) => state.category.categories);

  const Schema = Yup.object().shape({
    title: Yup.string().required("Blog's title is required"),
    category_id: Yup.string().required("Blog's category is required"),
    description: Yup.string().required("Blog's description is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      title: data?.title || "",
      category_id: data?.category_id || "",
      description: data?.description || "",
      image: data?.image || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });
  console.log(defaultValues, data);
  const { handleSubmit, reset, watch, setValue } = methods;

  // TODO: useEffects, write the useEffect codes here

  // TODO: fetch the brand, categories, size and color
  useEffect(() => {
    dispatch(fetchInclusive({ enqueueSnackbar, page: 0, limit: 100 }));
    dispatch(fetchCategories({ enqueueSnackbar }));
  }, [dispatch, enqueueSnackbar]);

  // TODO: functions

  // TODO: handle upload image
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

  // TODO: handle upload galleries

  const onCreateVehicle = (values) => {
    // TODO: dispatch the action to create a product
    const formData = new FormData();
    if (values?.title) {
      const slug = slugify(values.title, {
        lower: true,
        remove: /[*+~.()'"!:@]/,
        strict: true,
      });
      formData.append("slug", slug);
    }
    const jsonContent = JSON.stringify(content);

    formData.append("category_id", values.category_id);

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("content", jsonContent);
    // formData.
    if (photo) {
      console.log("asdasdasd", photo);
      formData.append("image", photo);
    }

    dispatch(createBlog({ data: formData, enqueueSnackbar, handleClose }));
  };

  const onUpdateProduct = (values) => {
    // TODO: dispatch the action to update a product
    const formData = new FormData();
    if (values?.title) {
      const slug = slugify(values.title, {
        lower: true,
        remove: /[*+~.()'"!:@]/,
        strict: true,
      });
      formData.append("slug", slug);
    }
    const jsonContent = JSON.stringify(content);
    formData.append("category_id", values.category_id);

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("content", jsonContent);

    console.log(typeof photo);
    delete values.image;
    if (photo) {
      formData.append("image", photo);
    }

    dispatch(
      updateBlog({
        data: formData,
        enqueueSnackbar,
        handleClose,
        id: data?.id,
        setRefresh,
      })
    );
  };

  return (
    <Box p={3}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(isEdit ? onUpdateProduct : onCreateVehicle)}
      >
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          }}
        >
          <Autocomplete
            defaultValue={defaultValues?.category_id}
            disabled={isView}
            name="category_id"
            disablePortal
            id="combo-box-main-category"
            options={
              categories?.data?.map((page) => ({
                label: page?.name,
                id: page?.id,
              })) || []
            }
            renderInput={(params) => (
              <RHFTextField
                name={"category_id"}
                {...params}
                label="Category *"
                disabled={isView}
              />
            )}
            onChange={(event, newValues) =>
              methods.setValue("category_id", newValues ? newValues.id : null)
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          />
          <RHFTextField
            name={"title"}
            label={"Blog's title *"}
            disabled={isView}
          />
        </Box>
        <Stack mt={5}>
          <RHFEditor
            placeholder="Write anwser here..."
            name={"description"}
            disabled={isView}
          />
        </Stack>
        <Stack my={5}>
          <span>Content</span>
          <DynamicForm setContent={setContent} data={data} isView={isView} />
        </Stack>

        <Box mt={3}>
          <Stack flexDirection={"row"} gap={3}>
            <Upload
              isAvatar={false}
              text={"Upload picture"}
              file={photo || defaultValues?.image}
              name="image"
              accept="image/*"
              maxSize={1}
              onDrop={handleDropPhoto}
            />
          </Stack>
        </Box>

        <Stack mt={2} alignItems={"end"}>
          <LoadingButton
            loading={createProductLoading}
            disabled={createProductLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? "Update blog" : "Create blog"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
