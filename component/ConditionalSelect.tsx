"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import jsonData from "@/assets/records.json";
import styles from "./ConditionalSelect.module.css";

interface Province {
  name: string;
  districts: District[];
}

interface District {
  name: string;
  municipality: string[];
  vdc: string[];
}

interface FormValues {
  province: string;
  district: string;
  municipality: string;
  vdc: string;
}

const ConditionalSelect: React.FC = () => {
  const initialValues: FormValues = {
    province: "",
    district: "",
    municipality: "",
    vdc: "",
  };

  const validationSchema = Yup.object().shape({
    province: Yup.string().required("Province is required"),
    district: Yup.string().required("District is required"),
    municipality: Yup.string().required("Municipality is required"),
    vdc: Yup.string().required("VDC is required"),
  });

  const onSubmit = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log(values);
    resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.formHandling}>
        <div className={styles.formField}>
          <div className={styles.formSelect}>
            <div className={styles.label}>
              <label>Province:</label>
              <select
                name="province"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.province}
                className={styles.individual}
              >
                <option value="">Select Province</option>
                {jsonData.map((province: Province) => (
                  <option key={province.name} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.province && formik.errors.province && (
              <div className={styles.error}>{formik.errors.province}</div>
            )}
          </div>

          <div className={styles.formSelect}>
            <div className={styles.label}>
              <label>District:</label>
              <select
                name="district"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.district}
                disabled={!formik.values.province}
                className={styles.individual}
              >
                <option value="">Select District</option>
                {jsonData
                  .find(
                    (province: Province) =>
                      province.name === formik.values.province
                  )
                  ?.districts.map((district: District) => (
                    <option key={district.name} value={district.name}>
                      {district.name}
                    </option>
                  ))}
              </select>
            </div>
            {formik.touched.district && formik.errors.district && (
              <div className={styles.error}>{formik.errors.district}</div>
            )}
          </div>

          <div className={styles.formSelect}>
            <div className={styles.label}>
              <label>Municipality:</label>
              <select
                name="municipality"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.municipality}
                disabled={!formik.values.district}
                className={styles.individual}
              >
                <option value="">Select Municipality</option>
                {jsonData
                  .find(
                    (province: Province) =>
                      province.name === formik.values.province
                  )
                  ?.districts.find(
                    (district: District) =>
                      district.name === formik.values.district
                  )
                  ?.municipality.map((municipality: string) => (
                    <option key={municipality} value={municipality}>
                      {municipality}
                    </option>
                  ))}
              </select>
            </div>
            {formik.touched.municipality && formik.errors.municipality && (
              <div className={styles.error}>{formik.errors.municipality}</div>
            )}
          </div>

          <div className={styles.formSelect}>
            <div className={styles.label}>
              <label>VDC:</label>
              <select
                name="vdc"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.vdc}
                disabled={!formik.values.district}
                className={styles.individual}
              >
                <option value="">Select VDC</option>
                {jsonData
                  .find(
                    (province: Province) =>
                      province.name === formik.values.province
                  )
                  ?.districts.find(
                    (district: District) =>
                      district.name === formik.values.district
                  )
                  ?.vdc.map((vdc: string) => (
                    <option key={vdc} value={vdc}>
                      {vdc}
                    </option>
                  ))}
              </select>
            </div>
            {formik.touched.vdc && formik.errors.vdc && (
              <div className={styles.error}>{formik.errors.vdc}</div>
            )}
          </div>
        </div>

        <button type="submit" className={styles.button}>
          Submit
        </button>
        </div>

    </form>
  );
};

export default ConditionalSelect;
