import React, { useState } from "react"
import { Shadow, TitleMd } from "../../../routers"
import {
  Avatar,
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react"
import { AiFillEdit } from "react-icons/ai"
import { BsFillTrash3Fill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

export const Staffs = () => {
  const navigate = useNavigate()
  return (
    <>
      <Shadow>
        <div className='flex justify-between'>
          <TitleMd>Staffs</TitleMd>
          <Button color='indigo' onClick={() => navigate("/add-staff")}>
            Add
          </Button>
        </div>
        <StaffsTable />
      </Shadow>
    </>
  )
}
export const StaffsTable = () => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([])

  const handleOpen = () => setOpen(!open)

  const TABLE_ROWS = [
    {
      role: "Manager",
      name: "sunil",
      email: "sunil@gmail.com",
      phone: "+977 9813253085",
      address: "baniyatar, jalapachowk, kathmandu, 3, 44600, Nepal",
      id: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    },
    {
      role: "Manager",
      name: "apptech",
      email: "apptech@gmail.com",
      phone: "+977 9813253085",
      address: "lalitpur, patna, lalitpur, 3, 44600, Nepal",
      id: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    },
  ]

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = TABLE_ROWS.map((n) => n.name)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }
  const isSelected = (name) => selected.indexOf(name) !== -1

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  return (
    <table className='w-full min-w-max table-auto text-left mt-8'>
      <thead>
        <tr className='text-primary capitalize'>
          <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
            <Checkbox
              color='indigo'
              onChange={handleSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </th>
          <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal leading-none opacity-70'
            >
              role
            </Typography>
          </th>

          <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal leading-none opacity-70'
            >
              email
            </Typography>
          </th>
          <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal leading-none opacity-70'
            >
              phone
            </Typography>
          </th>
          <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal leading-none opacity-70'
            >
              address
            </Typography>
          </th>
          <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal leading-none opacity-70'
            >
              ID Proof
            </Typography>
          </th>
          <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal leading-none opacity-70 flex justify-end mr-14'
            >
              Action
            </Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {TABLE_ROWS.map(({ name, email, phone, address, id }, index) => {
          const isLast = index === TABLE_ROWS.length - 1
          const classes = isLast ? "p-3" : "p-3 border-b border-blue-gray-50"
          const isItemSelected = isSelected(name)
          const labelId = `enhanced-table-checkbox-${index}`

          return (
            <tr
              key={name}
              className='text-left'
              onClick={(event) => handleClick(event, name)}
              tabIndex={-1}
            >
              <td className={classes}>
                <Checkbox
                  color='indigo'
                  checked={isItemSelected}
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </td>
              <td className={classes}>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal'
                >
                  {name}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal'
                >
                  {email}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal'
                >
                  {phone}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal'
                >
                  {address}
                </Typography>
              </td>
              <td className={classes}>
                <Avatar
                  onClick={handleOpen}
                  src={id}
                  alt={name}
                  size='sm'
                  className='cursor-pointer'
                />
                <Dialog open={open} handler={handleOpen}>
                  <DialogBody>
                    <img src={id} alt='name' className='w-full h-full' />
                  </DialogBody>
                </Dialog>
              </td>

              <td className={`${classes} flex justify-end gap-5`}>
                <ButtonGroup color='indigo'>
                  <Button>
                    <AiFillEdit size={20} />
                  </Button>
                  <Button>
                    <BsFillTrash3Fill size={20} />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
