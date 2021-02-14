import React from "react";
import Modal from "@material-ui/core/Modal";
import "./EditModalStyle.css";
import { putData } from "../../utils/Utils";

import { useFormik } from "formik";
import * as Yup from "yup";

//-------------MAIN FUNC------------
export default function EditModal({ open, setOpen, profile, refresh }) {
  // ------------FORMIK-------------
  const formik = useFormik({
    initialValues: {
      user: profile.user,
      image: profile.image,
      bio: profile.bio,
    },
    validationSchema: Yup.object({
      image: Yup.string(),
      bio: Yup.string().max(10000, "Must be less than 10000 chars"),
    }),
    onSubmit: (values) => {
      fetchData(values);
      setOpen(false);
    },
  });

  const fetchData = (values) => {
    putData("user/profile/", values)
      .then((data, err) => {
        alert("Successfully updated!");
      })
      .catch((err) => {
        alert(err?.message || "An error occured");
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className="modalContainer">
      <form onSubmit={formik.handleSubmit}>
        <div className="itemContainer">
          <h2 style={{ textAlign: "center" }}>{profile.user}'s Profile Edit</h2>
        </div>
        <div className="itemContainer">
          <div className="label">
            <label htmlFor="image">Image URL</label>
          </div>
          <input
            className="input"
            name="image"
            type="text"
            value={formik.values.image}
            onChange={formik.handleChange}
          />
          {formik.touched.image && formik.errors.image ? (
            <div className="error-message">{formik.errors.image}</div>
          ) : null}
        </div>
        <div className="itemContainer">
          <div className="label">
            <label htmlFor="bio">Biography</label>
          </div>
          <textarea
            className="textarea"
            style={{ minHeight: "100px", overflow: "scroll" }}
            name="bio"
            type="text"
            value={formik.values.bio}
            onChange={formik.handleChange}
          />
          {formik.touched.bio && formik.errors.bio ? (
            <div className="error-message">{formik.errors.bio}</div>
          ) : null}
        </div>
        <div className="buttonContainer">
          <button className="btn-submit" type="submit" onClick={refresh}>
            Submit
          </button>

          <button className="btn-cancel" onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        hideBackdrop={true}
      >
        {body}
      </Modal>
    </div>
  );
}
