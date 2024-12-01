import axios from 'axios';
import {url} from '../const/config';

export const getTruplan = (case_id: number | string, token: string | null) =>
  axios
    .get(`${url}/mobile/truplan/case-details/${case_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data);

export const uploadTruPlan = (case_id: number | string, token: string | null) =>
  axios
    .post(
      `${url}/mobile/truplan/case-details/${case_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(res => res.data);

export const getPatientDicom = (
  case_id: number | string | null,
  token: string,
) =>
  axios
    .get(`${url}/mobile/case-details/${case_id}/anatomy`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data);
