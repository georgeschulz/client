import React, { useState, useEffect } from "react";
import { Modal, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AgentSearch from "./agentSearch";
import AgentStatus from "./agentStatus";

const ContactModal = ({ open, handleClose, handleContact }) => {
    const [submitting, setSubmitting] = useState(false);
    const [agentFound, setAgentFound] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAgentFound(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);


    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            phone: Yup.string().required("Required"),
            address: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
            state: Yup.string().required("Required"),
            zip: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            setSubmitting(true);
            setTimeout(() => {
                handleContact(values);
                handleClose();
                setSubmitting(false);
            }, 500);
        },
    });

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                    <h2 className="text-2xl mb-4 font-semibold">Online Estimate chat</h2>
                    <p className="mb-4">Enter your  information while we find your pest consultant.</p>
                    <AgentStatus isFound={agentFound} />
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-4 gap-4">
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                className="col-span-2"
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                className="col-span-2"
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                className="col-span-4"
                            />
                            <TextField
                                label="Phone"
                                variant="outlined"
                                fullWidth
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                                className="col-span-4"
                            />
                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                                className="col-span-4"
                            />
                            <TextField
                                label="City"
                                variant="outlined"
                                fullWidth
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                                className="col-span-2"
                            />
                            <TextField
                                label="State"
                                variant="outlined"
                                fullWidth
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                error={formik.touched.state && Boolean(formik.errors.state)}
                                helperText={formik.touched.state && formik.errors.state}
                            />
                            <TextField
                                label="Zip"
                                variant="outlined"
                                fullWidth
                                name="zip"
                                value={formik.values.zip}
                                onChange={formik.handleChange}
                                error={formik.touched.zip && Boolean(formik.errors.zip)}
                                helperText={formik.touched.zip && formik.errors.zip}
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={submitting}
                                style={{ backgroundColor: "#c2b51e" }} 
                            >
                                {submitting ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default ContactModal;