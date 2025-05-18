import { atom } from "recoil";

interface Patient {
  email: String,
  id: String,
  name: String,
  role: String
}
const patient: Patient = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : null;
const patientState = atom<Patient | any>({
  key: "patientState",
  default: patient,
});

export default patientState;
