import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Edit , Search } from "@mui/icons-material";
import { Chip, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReadCredit, ReadCreditByUserId } from "../../services/credit.routes";
import { Link } from "react-router-dom";
import "./credit.css";

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
      field: "account_number",
      headerName: "ACCOUNT Number",
      width: 100,
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
      field: "fee_value",
      headerName: "FEE VALUE",
      width: 75,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 85,
      renderCell: (params) => (
        <Chip
          label={params.value === 0 ? "Active" : "Inactive"}
          color={params.value === 0 ? "success" : "error"}
        />
      ),
    },
    {
      field: "type_credit",
      headerName: "TYPE",
      width: 80,
    },
    {
      field: "client_name",
      headerName: "CLIENT",
      width: 100,
    },
    {
      field: "client_surname",
      headerName: "CLIENT LASTNAME",
      width: 100,
    },
    {
      field: "client_email",
      headerName: "CLIENT EMAIL",
      width: 150,
    },
    {
      field: "created_at",
      headerName: "APPROVED AT",
      width: 100,
    },
    {
      field: "approver_name",
      headerName: "APPROVER",
      width: 80,
    },
    {
      field: "approver_email",
      headerName: "APPROVER EMAIL",
      width: 150,
    },
    {
      field: "ACTIONS",
      headerName: "ACTIONS",
      width: 90,
      renderCell: (params) => (
        <div>
            <Link to={`/credit/${params.row.Id_credit}`}>
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

function Credits() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem('account'));
  const getCredits = async () => {
    let responseData;
    if (user && user.fk_role === 4) {
      responseData = await ReadCreditByUserId(user.Id_user); 
    } else {
      responseData = await ReadCredit();
    }

    const { data, error } = responseData ;
    if (error) {
      console.log(error);
    } else {
      setData(data);
    }
  };
  
  useEffect(() => {
    getCredits();
  }, []);


  return (
    <>
    <div className="credit-bg w-100">
      <div className="d-flex flex-column ms-5 mt-5 p-4 bg-light rounded-3" style={{width:"95%"}}>
        <h1>Credits</h1>
        <DataTable data={data} />
      </div>
    </div>
    </>
  );
}

export default Credits;
