/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { Add, Edit, Search } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReadCreditRequest, ReadCreditRequestByPendient, ReadCreditRequestByStatus } from "../../services/request.routes";
import { Link } from "react-router-dom";
import "./request.css"

const user = JSON.parse(localStorage.getItem('account'));

const setIdDataTable = (data) =>
  data.map((row, index) => ({ ...row, id: index + 1 }));

const DataTable = ({ data }) => {
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
      width: 30,
    },
    {
      field: "amount",
      headerName: "AMOUNT",
      width: 100,
    },
    {
      field: "dues",
      headerName: "DUES",
      width: 70,
    },
    {
      field: "description",
      headerName: "DESC",
      width: 150,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value === 0 ? "Pendient" : params.value === 1 ? "In Review": params.value === 2 ? "Approved" : "Refused"}
          color={params.value === 0 ? "secondary" :  params.value === 1 ? "warning":  params.value === 2 ? "success" : "error"}
        />
      ),
    },
    {
      field: "observation",
      headerName: "OBSERVATION",
      width: 150,
    },
    {
      field: "type",
      headerName: "TYPE",
      width: 100,
    },
    {
      field: "created_at",
      headerName: "REQUESTED AT",
      width: 150,
    },
    {
      field: "client_name",
      headerName: "CLIENT",
      width: 100,
    },
    {
      field: "client_surname",
      headerName: "CLIENT LAST NAME",
      width: 100,
    },
    {
      field: "ACTIONS",
      headerName: "ACTIONS",
      width: 150,
      renderCell: (params) => (
        <div>
            <Link to={`/credit_request/${params.row.Id_credit_request}`}>
                <button type="button" className="btn btn-warning me-3"><Edit /></button>
            </Link>
            
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
        {user && user.fk_role === 4 ? (
          <Grid xs={12} sm={4} className="d-flex justify-content-end mb-3">
            <Link to="/credit_request/create">
              <button type="button" className="btn btn-primary"><Add /> Add Request</button>
            </Link>
          </Grid>
          ) : (null) 
        }
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

function Requests() {

  const [data, setData] = useState([]);
  

  const getRequests = async () => {
    let responseData;
    if (user && user.fk_role === 2) {
      responseData = await ReadCreditRequestByStatus(); 
    } 
    if(user && user.fk_role === 3) {
      responseData = await ReadCreditRequestByPendient(); 
    }
    if (user && user.fk_role === 1){
      responseData = await ReadCreditRequest();
    }
    const { data, error } = responseData;
    error ? console.log(error) : setData(data);
  };

  useEffect(() => {
    getRequests();
    console.log(data)
  }, []);

  return (
    <>
    <div className="request-img w-100 position-relative">
      <div className="d-flex flex-column ms-5 mt-5 p-4 bg-light rounded-3" style={{width:"90%"}}>
        <h1>Requests</h1>
        <DataTable data={data} />
      </div>
    </div>
    </>
  );
}

export default Requests;
