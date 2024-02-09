/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button, Grid, CircularProgress, InputLabel, Select, MenuItem } from '@mui/material';
import { Save } from "@mui/icons-material";
import { SkeletonForm } from "../skeleton";
import { ReadUserId, UpdateUserId } from "../../services/user.routes";
import setNameField from "../../tools/forms/userForm.json";
import AlertComponent from '../alerts';
const selectField= [
  "status",
  "fk_role"
]
const noDisabledFields = [];
const noVisibleFields = ["id", "created_at", "updated_at", "role"];

const Roles = [
  {
    range:"Gerente",
    value: 2
  },
  {
    range:"Asesor",
    value:3
  },
  {
    range:"Cliente",
    value:4
  }
]
const Status = [
  {
    range:"Active",
    value:0
  },
  {
    range:"Inactive",
    value:1
  }
] 

const UserFormComponent = ({ id }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const getDataUserById = async () => {
    const response = await ReadUserId(id);
    setUserData(response.data);
    setLoading(false);
  };

  const UpdateUserbyId = async (data) => {
    setLoadingButton(true); 
    const { error } = await UpdateUserId(id, data);
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
  };

  const handleCloseAlert = () => {
    setAlertConfig({ ...alertConfig, open: false });
  };

  useEffect(() => {
    getDataUserById();
  }, [id]);

  useEffect(() => {

    Object.entries(userData).forEach(([key, value]) => {
      setValue(key, value);
    });
    
  }, [userData, setValue]);

  const onSubmit = (data) => {
    const newDataNameFields = {};
    Object.entries(data).forEach(([key, value]) => {
      newDataNameFields[setNameField[key]?.name || key] = value;
    });
    //const sendData = {...role, newDataNameFields} 
    console.log(newDataNameFields)
    UpdateUserbyId(newDataNameFields);
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
          <Grid container spacing={2}>
            {Object.entries(userData).map(([key], idx) => (
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
                          <TextField
                            {...field}
                            value={field.value}
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
                          <>
                          
                          <InputLabel id="label" className="position-absolute top-0" style={{fontSize:14, left:27}}>{setNameField[key]?.label}</InputLabel>

                          <Select
                            {...field}
                            label={setNameField[key]?.label}
                            error={!!errors[key]}
                            variant="outlined"
                            fullWidth
                          >
                            {setNameField[key]?.name === "fk_role" &&                                
                            Roles.map((item, idx) => (
                              <MenuItem
                                key={idx}
                                value={item.value}
                              >
                                {item.range}
                              </MenuItem>
                              
                            ))}
                            {setNameField[key]?.name === "status" &&                                
                            Status.map((item, idx) => (
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
              <Button disabled={loadingButton} type="submit" variant="contained" className="bg-primary">
                {loadingButton ? <CircularProgress size={20} style={{ color: 'white' }} /> : (
                  <>Guardar <Save className="ml-2" /></>
                )}
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </form>
  );
};

export default UserFormComponent;