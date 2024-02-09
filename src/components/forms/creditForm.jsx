/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Grid, CircularProgress, InputLabel, Select, MenuItem, List, ListItem, ListItemText } from '@mui/material';
import { Close } from "@mui/icons-material";
import { SkeletonForm } from "../skeleton";
import { ReadCreditId, UpdateCreditId } from "../../services/credit.routes";
import setNameField from "../../tools/forms/creditForm.json";
import AlertComponent from '../alerts';

const selectField= [ "status","dues"];
const user = JSON.parse(localStorage.getItem("account")); 


const noDisabledFields = ["status","dues"];
const noVisibleFields = ["id", "updated_at", "typeid", "client_id", "approver_id"];

const Status = [
  { range:"Approved", value:0 }, { range:"Refused", value:1 }
];
const Dues = [
  {range:6, value:6 }, { range:12, value:12 }, { range:24, value:24 }, { range:36, value:36 },
]

const CreditFormComponent = ({ id }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [creditData, setCreditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const getDataCreditById = async () => {
    const response = await ReadCreditId(id);
    setCreditData(response.data[0]);
    setLoading(false);
  };

  const UpdateCreditbyId = async (data) => {
    setLoadingButton(true); 
    const { error } = await UpdateCreditId(id, data);
    if (error) {
      setAlertConfig({
        open: true,
        message: "No se logró actualizar satisfactoriamente, intentalo de nuevo más tarde.",
      });
    } else {
      setAlertConfig({
        open: true,
        message: "Datos actualizados exitosamente.",
      });
    }
    setLoadingButton(false);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const handleCloseAlert = () => {
    setAlertConfig({ ...alertConfig, open: false });
  };

  useEffect(() => {
    getDataCreditById();
  }, [id]);

  useEffect(() => {

    Object.entries(creditData).forEach(([key, value]) => {
      setValue(key, value);
    });
    
  }, [creditData, setValue]);

  const onSubmit = (data) => {
    const newDataNameFields = {};
    Object.entries(data).forEach(([key, value]) => {
      newDataNameFields[setNameField[key]?.name || key] = value;
    });
    const dataToUpdate = { ...newDataNameFields, status: 1}
    
    UpdateCreditbyId(dataToUpdate);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
      <AlertComponent {...alertConfig} handleClose={handleCloseAlert} />
      {loading ? (
        <div className='p-4' style={{width: "70vw"}}>
          <SkeletonForm />
        </div>
      ) : (
        <>
          <Grid container spacing={2} className='p-4'>
            {Object.entries(creditData).map(([key], idx) => (
              <Fragment key={idx}>
                {!noVisibleFields.includes(key) && (
                  <Grid item xs={12} sm={6} className='position-relative'>
                    <Controller
                      name={key}
                      control={control}
                      defaultValue=""
                      disabled={noDisabledFields.includes(key)}
                      render={({ field }) => (
                        !selectField.includes(key) ? (
                          <List {...field} className='m-0'>
                              <ListItem disablePadding >
                                  <ListItemText primary={setNameField[key]?.label} secondary={field.value}/>
                              </ListItem>
                            </List>
                        ):(
                          <>
                          
                          <InputLabel id="label" className="position-absolute top-0" style={{fontSize:14, left:27}}>{setNameField[key]?.label}</InputLabel>

                          <Select
                            {...field}
                            label={setNameField[key]?.label}
                            error={!!errors[key]}
                            variant="outlined"
                            fullWidth
                          >
                            
                            {setNameField[key]?.name === "status" &&                                
                            Status.map((item, idx) => (
                              <MenuItem
                                key={idx}
                                value={item.value}
                              >
                                {item.range}
                              </MenuItem>
                              
                            ))}
                            {setNameField[key]?.name === "dues" &&                                
                            Dues.map((item, idx) => (
                              <MenuItem
                                key={idx}
                                value={item.value}
                              >
                                {item.range}
                              </MenuItem>
                              
                            ))}                            
                            
                          </Select>
                          {errors[key] && (
                            <div className="text-red-500 text-xs">
                              {errors[key].message}
                            </div>
                          )}
                          </>
                        )
                      )}
                    />
                  </Grid>
                )}
              </Fragment>
            ))}

            <Grid item xs={12} className='d-flex justify-content-start'>
              {user.fk_role === 1 && creditData.status === 0 || user.fk_role === 2 && creditData.status === 0 ? (
                <Button disabled={loadingButton} type="submit" variant="contained" className="bg-danger">
                {loadingButton ? <CircularProgress size={20} style={{ color: 'white' }} /> : (
                  <>Delete Credit<Close className="ml-2" /></>
                )}
              </Button>
              ):(
                null
              )}
              
            </Grid>
          </Grid>
        </>
      )}
    </form>
  );
};

export default CreditFormComponent;