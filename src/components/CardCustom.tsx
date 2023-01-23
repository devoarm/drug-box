import { Box } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function CardCustom({ children }: Props) {
  return (
    <Box className="bg-white shadow-md p-5 rounded-lg my-3">
      {children}
    </Box>
  );
}

export default CardCustom;
