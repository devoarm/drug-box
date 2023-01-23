import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import React from "react";

type Props = {
  lable: String;
  onClick?: any;
  style?: any;
  loading: any;
};

function LoadingButtonPrimary({ lable, onClick, style, loading }: Props) {
  return (
    <LoadingButton
      className={`${style} bg-gradient-to-r from-blue-500 blue-400 to-blue-300 py-2 px-6 max-w-xl rounded-lg max active:shadow-md hover:shadow-md`}
      onClick={onClick}
      loading={loading}
    >
      {<Typography className="text-white">{lable}</Typography>}
    </LoadingButton>
  );
}

export default LoadingButtonPrimary;
