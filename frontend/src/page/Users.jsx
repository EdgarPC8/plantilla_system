import {
  Container,
  IconButton,
  Button,
  Avatar,
} from "@mui/material";
import DataTable from "../Components/Tables/DataTable";
import { useEffect, useState } from "react";
import { deleteUserRequest, getUsersRequest } from "../api/userRequest";
import { Person, Edit, Delete } from "@mui/icons-material";
import toast from "react-hot-toast";
import SimpleDialog from "../Components/Dialogs/SimpleDialog";
import UserForm from "../Components/Forms/UserForm";
import { pathPhotos } from "../api/axios";


function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [datos, setDatos] = useState([]);
  const [titleUserDialog, settitleUserDialog] = useState("");

  const fetchUsers = async () => {
    const { data } = await getUsersRequest();
    setUsers(data);
  };

  const handleDialog = () => {
    setOpen(!open);
  };
  const handleDialogUser = () => {
    setOpenDialog(!openDialog);
  };

  const deleteUser = async () => {
    toast.promise(
      deleteUserRequest(userToDelete.id),
      {
        loading: "Eliminando...",
        success: "Usuario elimninado con éxito",
        error: "Ocurrio un error",
      },
      {
        position: "top-right",
        style: {
          fontFamily: "roboto",
        },
      }
    );

    setUsers(users.filter((user) => user.id !== userToDelete.id));
    handleDialog();
  };

  const columns = [
    {
      headerName: "Id",
      field: "others",
      width: 50,
      sortable: false,
      renderCell: (params,index) => {
        return params.id;
      },
    },
    {
      headerName: "Cedula",
      field: "ci",
      width: 100,
    },
    {
      headerName: "Primer Nombre",
      field: "firstName",
      width: 130,
    },
     {
      headerName: "Segundo Nombre",
      field: "secondName",
      width: 130,
    },
    {
      headerName: "Primer Apellido",
      field: "firstLastName",
      width: 130,
    },
    {
      headerName: "Segundo Apellido",
      field: "secondLastName",
      width: 130,
    },
    {
      headerName: "Fecha de nacimiento",
      field: "birthday",
      width: 150,
    },
    {
      headerName: "Genero",
      field: "gender",
      width: 80,
    },
    {
      headerName: "Foto",
      field: "photoPerfil",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <>
             <Avatar
          src={`${pathPhotos}${params.row.photo}`} // Imagen del estado
          alt={params.row.firstName}
        />
        </>
      ),
    },
    {
      headerName: "Actions",
      field: "actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              setDatos(params.row)
              setIsEditing(true)
              settitleUserDialog("Editar Usuario")
              handleDialogUser();
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => {
              handleDialog();
              setUserToDelete(params.row);
            }}
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <Container>
        <SimpleDialog
        open={open}
        onClose={handleDialog}
        tittle="Eliminar Usuario"
        onClickAccept={deleteUser}
      >
            ¿Está seguro de eliminar al usuario?
      </SimpleDialog>
      <Button
        sx={{ marginTop: "30px" }}
        variant="text"
        endIcon={<Person />}
        onClick={() => {
          setIsEditing(false)
          settitleUserDialog("Agregar Usuario")
          handleDialogUser();
        }}
      >
        Añadir Usuario
      </Button>

      <SimpleDialog
        open={openDialog}
        onClose={handleDialogUser}
        tittle={titleUserDialog}
      >
        <UserForm onClose={handleDialogUser} isEditing={isEditing} datos={datos} reload={fetchUsers}></UserForm> 
      </SimpleDialog>
      <DataTable data={users} columns={columns} />
    </Container>
  );
}

export default Users;
