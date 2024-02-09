/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button, Grid, CircularProgress, InputLabel, Select, MenuItem, List, ListItem, ListItemText } from '@mui/material';
import { Check, Close } from "@mui/icons-material";
import { SkeletonForm } from "../skeleton";
import { ReadCreditRequestId, UpdateCreditRequestId } from "../../services/request.routes";
import { CreateCredit } from "../../services/credit.routes";
import setNameField from "../../tools/forms/requestForm.json";
import AlertComponent from '../alerts';
const selectField= [ "status","dues"];
const listField = [
  "interest",
  "type",
  "client_name",
  "client_surname",
  "created_at",
  "description"
];
const userRole = JSON.parse(localStorage.getItem("account")); 
let validate = ["status",];
userRole ? (
  userRole.fk_role === 4 ? validate = ["status", "dues", "amount", "observation"] : null
) : ( null );

const noDisabledFields = validate;
const noVisibleFields = ["id", "updated_at", "typeid", "client_id", ];

const Status = [
  { range:"Pendient", value:0 }, { range:"In Review", value:1 }, { range:"Approved", value:2 }, { range:"Refused", value:3 }
];
const Dues = [
  {range:6, value:6 }, { range:12, value:12 }, { range:24, value:24 }, { range:36, value:36 },
]

const RequestFormComponent = ({ id }) => {
  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const [requestData, setRequestData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const getDataRequestById = async () => {
    const response = await ReadCreditRequestId(id);
    setRequestData(response.data[0]);
    setLoading(false);
  };

  const UpdateCreditRequestbyId = async (data) => {
    setLoadingButton(true); 
    const { error } = await UpdateCreditRequestId(id, data);
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
  const CreateNewCredit = async (data) => {
    setLoadingButton(true); 
    const { error } = await CreateCredit(data);
    if (error) {
      setAlertConfig({
        open: true,
        message: "No se logró aprobar la solicitud satisfactoriamente, intentalo de nuevo más tarde.",
      });
    } else {
      setAlertConfig({
        open: true,
        message: "Crédito creado exitosamente.",
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
    getDataRequestById();
  }, [id]);

  useEffect(() => {

    Object.entries(requestData).forEach(([key, value]) => {
      setValue(key, value);
    });
    
  }, [requestData, setValue]);

  const onSubmit = (data) => {
    const newDataNameFields = {};
    Object.entries(data).forEach(([key, value]) => {
      newDataNameFields[setNameField[key]?.name || key] = value;
    });
    const dataToUpdate = { ...newDataNameFields, status: 2}
    const dataToApprove = { ...newDataNameFields, status: 0, type_credit:newDataNameFields.typeid, approver_id: userRole.Id_user, fk_user:newDataNameFields.client_id}
    UpdateCreditRequestbyId(dataToUpdate);
    CreateNewCredit(dataToApprove);
  };
  const handleUpdate = (data, status) => {
    const newDataNameFields = {};
    Object.entries(data).forEach(([key, value]) => {
      newDataNameFields[setNameField[key]?.name || key] = value;
    });
    const dataToUpdate = { ...newDataNameFields, status: status}
    UpdateCreditRequestbyId(dataToUpdate);
  }

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
            {Object.entries(requestData).map(([key], idx) => (
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
                          !listField.includes(key) ? (
                            <TextField
                              {...field}
                              value={field.value === null ? "" :  field.value}
                              type={setNameField[key]?.type}
                              label={setNameField[key]?.label}
                              onChange={
                                setNameField[key]?.type === "number"
                                  ? (e) => {
                                    field.onChange(e.target.valueAsNumber);
                                  }
                                  : (e) => field.onChange(e.target.value)
                              }
                              variant="outlined"
                              fullWidth
                              />
                          ):(
                            <List {...field}>
                              <ListItem disablePadding >
                                  <ListItemText primary={setNameField[key]?.label} secondary={field.value}/>
                              </ListItem>
                            </List>
                          )
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

            <Grid item xs={12}>
              {requestData.status === 3 || requestData.status === 2 ? (
                null
              ):(
                <>
                  {requestData.status === 0 && userRole.fk_role !== 4 ? (
                    <>
                    <Button disabled={loadingButton} type="button" variant="contained" className="bg-warning me-3" onClick={() => handleUpdate(getValues(), 1)}>
                      {loadingButton ? <CircularProgress size={20} style={{ color: 'white' }} /> : (
                        <>Pass to review<Check className="ml-2" /></>
                      )}
                    </Button>                  
                    </>
                  ) : (
                    userRole.fk_role !== 4 && userRole.fk_role === 2 || userRole.fk_role === 1 ? (
                      <>
                      <Button disabled={loadingButton} type="submit" variant="contained" className="bg-success me-3">
                        {loadingButton ? <CircularProgress size={20} style={{ color: 'white' }} /> : (
                          <>Approve <Check className="ml-2" /></>
                        )}
                      </Button>
                      </>
                    ) : (null)
                  )}
                  <Button disabled={loadingButton} type="button" variant="contained" className="bg-danger"  onClick={() => handleUpdate(getValues(), 3)}>
                    {loadingButton ? <CircularProgress size={20} style={{ color: 'white' }} /> : (
                      <>Cancel <Close className="ml-2" /></>
                    )}
                  </Button>
                </>
              )}
              
            </Grid>
          </Grid>
        </>
      )}
    </form>
  );
};

export default RequestFormComponent;