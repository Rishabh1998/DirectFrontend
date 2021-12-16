import React, { useState, useEffect } from 'react'
import { Grid, TextField, Typography } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as apiService from "../../services/apiService";

const initialFValues = {
    email: '',
    password: '',
    confirmPassword: '',
    login_email: '',
    login_password: ''
}

export default function SignupForm() {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('confirmPassword' in fieldValues)
            temp.confirmPassword = values.password === fieldValues.confirmPassword ? "" : "Passwords do not match."
        if ('login_email' in fieldValues)
            temp.login_email = (/$^|.+@.+..+/).test(fieldValues.login_email) ? "" : "Email is not valid."
             
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            apiService.create(values)
            resetForm()
        }
    }

    const handleLoginSubmit = e => {
        e.preventDefault()
        if (validate()){
            apiService.login(values)
            resetForm()
        }
    }

    return (
        <div>
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <Controls.Input
                        label="Password Confirmation"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleInputChange}
                        error={errors.confirmPassword}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h3" component="h2">
                        or Login
                    </Typography>;
                </Grid>
            </Grid>
        <Form onSubmit={handleLoginSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Email"
                        name="login_email"
                        value={values.login_email}
                        onChange={handleInputChange}
                        error={errors.login_email}
                    />
                    <Controls.Input
                        label="Password"
                        name="login_password"
                        value={values.login_password}
                        onChange={handleInputChange}
                        error={errors.login_password}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
        </div>
    )
}
