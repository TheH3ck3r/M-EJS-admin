import axios from "axios";
import { kBaseEndpoint } from "common/app";
import Router from "next/router";
import useSWR, { Key, Fetcher } from "swr";

const BaseFetcher = (url: string) =>
  axios
    .get(url, {
      baseURL: kBaseEndpoint,
    })
    .then((res) => res.data);

const StudentFetcher = (url: string) =>
  axios
    .get(url, {
      baseURL: `${kBaseEndpoint}/student`,
    })
    .then((res) => res.data);

export const JournalFetcher = (url: string) =>
  axios
    .get(url, {
      baseURL: `${kBaseEndpoint}/journal`,
    })
    .then((res) => res.data);

export const AttendanceFetcher = (url: string) =>
  axios
    .get(url, {
      baseURL: `${kBaseEndpoint}/attendance`,
    })
    .then((res) => res.data);

export const CertificatesFetcher = (url: string) => 
  axios
    .get(url, {
      baseURL: `${kBaseEndpoint}/certificate`
    })
    .then((res)=>res.data)

export const useCheckAuth = (vk_id: string) => {
  const { data, error, isLoading } = useSWR(
    `/journal/v1/rights/${vk_id}`,
    BaseFetcher
  );

  return { data, error, isLoading };
};

export const useAuth = (key: Key, fetcher: Fetcher<any>) => {
  const vkId = window.localStorage.getItem("VkId");

  const {
    data: isSuperAdmin,
    error: isSuperAdminError,
    isLoading: isSuperAdminLoading,
  } = useCheckAuth(vkId!);

  const { data, error, mutate } = useSWR(key, fetcher);

  while (!isSuperAdminLoading) {
    if (isSuperAdmin && isSuperAdmin.isSuperAdmin) {
      return { data, error, mutate };
    } else {
      RedirectToAuth();
      break;
    }
  }

  return { date: undefined, error: undefined, mutate: undefined };
};

export const RedirectToAuth = () => {
  Router.push("/auth");
};

export { BaseFetcher, StudentFetcher };
