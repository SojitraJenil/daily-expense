/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FuelFormModal from "component/FuelFormModal/FuelFormModal";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import {
  addFuelDetails,
  deleteFuelDetails,
  showAllFuelDetails,
  showAllFuelDetailsByMobileNo,
  updateFuelDetails,
} from "API/api";
import Cookies from "universal-cookie";
import moment from "moment";
import Swal from "sweetalert2";
import { NavigateNameAtom } from "atom/atom";
import { useAtom } from "jotai";
import TransactionItemNew from "component/TransactionItem/TransactionItemNew/TransactionItemNew";

function Fuel() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [fuelRecord, setFuelRecord] = useState<any>();
  const [selectedFuel, setSelectedFuel] = useState<any>(null);
  const cookies = new Cookies();
  const mobileNumber = cookies.get("mobileNumber");
  const [isNavigate] = useAtom(NavigateNameAtom);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setIsEditOpen(false);
  };
  const initialFormValues = {
    Currentkm: 0,
    fuelPrice: 0,
    mobileNumber: mobileNumber,
    fuelVolume: 0,
  };

  const addFuelRecord = async (formValues: any) => {
    try {
      await addFuelDetails(formValues);
      ShowFuelRecord();
      handleClose();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const editFuelRecord = async (formValues: any) => {
    try {
      await updateFuelDetails(selectedFuel._id, formValues);
      ShowFuelRecord();
      handleClose();
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  useEffect(() => {
    ShowFuelRecord();
  }, [isNavigate]);

  const ShowFuelRecord = async () => {
    setLoading(true);
    try {
      const normalizedMobileNumber = String(mobileNumber).trim();
      const response = await showAllFuelDetailsByMobileNo(
        normalizedMobileNumber
      );
      setFuelRecord(response.data);
      handleClose();
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (id: string) => {
    Swal.fire({
      title: "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteFuelDetails(id);
          ShowFuelRecord();
        } catch (error) {
          console.error("Error deleting transaction: ", error);
          Swal.fire({
            title: "Error",
            text: "Failed to delete transaction.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleEditClick = (fuel: any) => {
    setSelectedFuel(fuel);
    setIsEditOpen(true);
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-full my-[250px]">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="bg-white h-screen">
      <div className="flex py-3  pt-8 justify-evenly items-center  ">
        <Box className="w-40 bg-gray-800 p-4 border-2 border-solid border-red-700 rounded-lg flex flex-col items-center justify-center">
          <ArrowUpwardIcon className="text-red-400 text-3xl mb-2" />
          <Typography className="text-gray-300 mb-2 text-center">
            Expense
          </Typography>
          <Typography variant="h6" className="text-white">
            {loading ? <Skeleton width={60} /> : `₹${"344"}`}
          </Typography>
        </Box>
        <Box className="w-40 bg-gray-800 p-4 border-2 border-solid border-green-700 rounded-lg flex flex-col items-center justify-center">
          <ArrowDownwardIcon className="text-green-400 text-3xl mb-2" />
          <Typography className="text-gray-300 mb-2 text-center">
            Income
          </Typography>
          <Typography variant="h6" className="text-white text-sm">
            {loading ? <Skeleton width={60} /> : `₹${"234"}`}
          </Typography>
        </Box>
      </div>
      <div className="text-center">
        <Box sx={{ paddingBottom: 2, marginLeft: 10, marginRight: 10 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            fullWidth
            className="px-8 py-2  text-white bg-blue-700 rounded transition duration-75 ease-in-out hover:bg-green-400 transform mt-6 align-middle justify-center flex mx-auto"
          >
            Add Fuel Details
          </Button>
        </Box>
      </div>
      <hr className="mt-2 bg-black" />
      <p className="text-black text-[19px] ms-5 mt-2">Fuel Records</p>
      {fuelRecord &&
        fuelRecord.reverse().map((item: any, index: number) => {
          return (
            <React.Fragment key={item._id}>
              {index === 0 ||
              moment(item.timestamp).format("DD-MM-YYYY") !==
                moment(fuelRecord[index - 1].timestamp).format("DD-MM-YYYY") ? (
                <div className="mt-4 bg-slate-400 text-white text-center mx-4 rounded-sm">
                  {moment(item.timestamp).format("DD-MM-YYYY")}
                </div>
              ) : null}
              <Box
                className={"bg-red-100  border-[#db8f8f]"}
                sx={{
                  marginLeft: 2,
                  marginRight: 2,
                  marginTop: 2,
                  paddingTop: 0,
                  paddingBottom: 0,
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 1,
                  boxShadow: 1,
                }}
              >
                <TransactionItemNew
                  name={"Fuel"}
                  fuel={item}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  Time={moment(item.timestamp).format("hh:mm A")}
                />
              </Box>
            </React.Fragment>
          );
        })}

      <FuelFormModal
        open={isOpen}
        onClose={handleClose}
        onSubmit={addFuelRecord}
        initialValues={initialFormValues}
        title="Add Fuel Details"
      />

      {selectedFuel && (
        <FuelFormModal
          open={isEditOpen}
          onClose={handleClose}
          onSubmit={editFuelRecord}
          initialValues={selectedFuel}
          title="Edit Fuel Details"
        />
      )}
    </div>
  );
}

export default Fuel;
