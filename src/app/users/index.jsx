/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { Edit , Add, DeleteForever, Search } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReadUsers, ReadUsersAdmin } from "../../services/user.routes";
import { Link } from "react-router-dom";
import { LaravelContext } from "../../context";
import "./user.css";

const setIdDataTable = (data) =>
  data.map((row, index) => ({ ...row, id: index + 1 }));

const DataTable = ({ data }) => {
    const {handleOpenModal} = useContext(LaravelContext);
    const handleClick = (id) => {
      handleOpenModal(id);
    };
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (event) => {
      const searchTerm = event.target.value.toLowerCase();
      const filteredResults = data.filter((row) =>
        Object.values(row).some(
          (value) =>
            value !== null && value.toString().toLowerCase().includes(searchTerm)
        )
      );
      setSearchTerm(searchTerm);
      setFilteredData(setIdDataTable(filteredResults));
    };
  
    useEffect(() => {
      setFilteredData(setIdDataTable(data));
    }, [data]);

    const columns = [
    {
      field: "id",
      headerName: "#",
      width: 75,
    },
    {
      field: "name",
      headerName: "NAME",
      width: 100,
    },
    {
      field: "surname",
      headerName: "LAST NAME",
      width: 100,
    },
    {
      field: "email",
      headerName: "EMAIL",
      width: 200,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value === 0 ? "Active" : "Inactive"}
          color={params.value === 0 ? "success" : "error"}
        />
      ),
    },
    {
      field: "role",
      headerName: "ROLE",
      width: 100,
    },
    {
      field: "ACTIONS",
      headerName: "ACTIONS",
      width: 150,
      renderCell: (params) => (
        <div>
            <Link to={`/user/${params.row.Id_user}`}>
                <button type="button" className="btn btn-warning me-3"><Edit /></button>
            </Link>
            <button type="button" className="btn btn-danger" onClick={() => handleClick(params.row.Id_user)}><DeleteForever /></button>
        </div>
      ),
    },
  ];

  
  return (
    <div className="w-lg-100 w-md-50 p-4" style={{ height: "80vh" }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={8}>
          <TextField
            id="search"
            label="Buscar"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginBottom: "16px" }}
            InputProps={{
              startAdornment: <Search />,
            }}
          />
        </Grid>

        <Grid xs={12} sm={4} className="d-flex justify-content-end mb-3">
          <Link to="/users/create">
            <button type="button" className="btn btn-primary"><Add /> Add User</button>
          </Link>
        </Grid>
      </Grid>
      <DataGrid
        style={{
          borderRadius: 10,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          border: "0px solid #E5E7EB",
        }}
        rows={filteredData}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
};

function Users() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem('account'));

  const getUsers = async () => {
    let responseData;
    if (user && user.fk_role === 1) {
      responseData = await ReadUsersAdmin(); 
    } else {
      responseData = await ReadUsers();
    }
    const { data, error } = responseData;
    error ? console.log(error) : setData(data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
    <div className="user-bg w-100">

      <div className="d-flex flex-column ms-5 mt-5 p-4 bg-light rounded-3" style={{width:"90%"}}>
        <h1>Users</h1>
        <DataTable data={data}/>
      </div>
    </div>
    </>
  );
}

export default Users;