import { useEffect, useState } from "react";
import { Box, Modal } from "@material-ui/core";
import styled from "styled-components";

// table - start
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { getUsers, removeUser } from "../../redux/actions/jobview";
import {
  RiUserAddFill,
  RiUserSettingsFill,
  RiUserUnfollowFill,
  RiCloseCircleLine,
} from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { signup } from "../../redux/actions/auth";

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "100%",
  },
});

const Users = () => {
  // table start
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [usersData, setUsersData] = useState<any>();

  const [username, set_username] = useState<any>("");
  const [email, set_email] = useState<any>("");
  const [password, set_password] = useState<any>("");
  const [repassword, set_repassword] = useState<any>("");

  const handleAddModalClose = () => setAddModalOpen(false);
  const [openAddModal, setAddModalOpen] = useState(false);

  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      usersData && Object.keys(usersData).length - page * rowsPerPage
    );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // table end

  const handleRemoveUser = (username: any, index: any) => {
    removeUser(username).then((res) => {
      if (res.flag_success === "success") {
        NotificationManager.error(
          `Removed username "${username}".`,
          "Hi!",
          3000
        );
        let tempData: any = usersData.filter((item: any) => item !== index);
        setUsersData(tempData);
      }
    });
  };

  const handleAddNewUser = () => {
    if (username === "") {
      NotificationManager.error("Type your username!", "Error!", 3000);
      return;
    }
    if (email === "") {
      NotificationManager.error("Type your email!", "Error!", 3000);
      return;
    }
    if (email !== "") {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        NotificationManager.error("Invaild email address!", "Error!", 3000);
        return;
      }
    }
    if (password === "") {
      NotificationManager.error("Type your password!", "Error!", 3000);
      return;
    }
    if (repassword === "") {
      NotificationManager.error(
        "Type your password to confirm!",
        "Error!",
        3000
      );
      return;
    }
    if (password !== repassword) {
      NotificationManager.error(
        "Password doesn't match! Check your password again!",
        "Error!",
        3000
      );
      return;
    }
    let signup_data: any = {
      username: username,
      email: email,
      password: password,
      permission: true,
    };
    signup(signup_data).then((flag_success) => {
      if (flag_success === "success") {
        NotificationManager.info(
          "Added new user.",
          "Success!",
          3000
        );
      } else if (flag_success === "same_user") {
        NotificationManager.warning(
          "Username already exists, try again!",
          "Warning!",
          3000
        );
        set_username("");
        return;
      } else if (flag_success === "same_email") {
        NotificationManager.warning(
          "Email already exists, try again!",
          "Warning!",
          3000
        );
        set_email("");
        return;
      }
    });
  };

  useEffect(() => {
    getUsers().then((res) => {
      setUsersData(res.users);
    });
  }, [usersData]);

  return (
    <StyledComponent>
      <Workflow>
        <UserSearchAddBox>
          <SearchBox></SearchBox>
          <AddNewUserBox
            onClick={() => {
              setAddModalOpen(true);
            }}
          >
            <AddButton01>
              <RiUserAddFill fontSize={"1.3rem"} fontWeight={"800"} />{" "}
              <Box display={"flex"} ml={"5px"}>
                Add
              </Box>
            </AddButton01>
          </AddNewUserBox>
        </UserSearchAddBox>

        <TablePart01>
          <TableContainer className={classes.container}>
            <Table
              aria-label="custom pagination table"
              stickyHeader
              style={{ height: "100%", background: "white" }}
            >
              <TableHead style={{ minHeight: "60px" }}>
                <TableRow>
                  <TableCell width="5%">No</TableCell>
                  <TableCell width="15%">
                    <Box display={"flex"} width={"100%"}>
                      Username
                    </Box>
                  </TableCell>
                  <TableCell width="20%">Email</TableCell>
                  <TableCell width="25%">Created Date</TableCell>
                  <TableCell width="5%">Permission</TableCell>
                  <TableCell width="30%"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ overflow: "auto" }}>
                {usersData &&
                  (rowsPerPage > 0
                    ? usersData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : usersData
                  ).map((each: any, index: any) => (
                    <TableRow key={index} hover>
                      <TableCell width="5%">
                        {usersData.length < rowsPerPage
                          ? index + 1
                          : page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell width="20%">{each.username}</TableCell>
                      <TableCell width="20%">{each.email}</TableCell>
                      <TableCell width="20%">{each.signup_date}</TableCell>
                      <TableCell width="5%">
                        {each.permission.toString()}
                      </TableCell>
                      <TableCell width="30%">
                        <Box
                          display={"flex"}
                          width={"100%"}
                          justifyContent={"center"}
                        >
                          <Editutton01 mr={"10px"}>
                            <RiUserSettingsFill
                              fontSize={"1.3rem"}
                              fontWeight={"800"}
                            />{" "}
                            <Box display={"flex"} ml={"5px"}>
                              Edit
                            </Box>
                          </Editutton01>
                          <RemoveButton01>
                            <RiUserUnfollowFill
                              fontSize={"1.3rem"}
                              fontWeight={"800"}
                            />{" "}
                            <Box
                              display={"flex"}
                              ml={"5px"}
                              onClick={() => {
                                handleRemoveUser(each.username, index);
                              }}
                            >
                              Remove
                            </Box>
                          </RemoveButton01>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                {/* {emptyRows > 0 && (
                  <TableRow style={{ height: 90 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={{ minHeight: "60px" }}
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={6}
            count={usersData ? Object.keys(usersData).length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TablePart01>
      </Workflow>
      <Modal
        open={openAddModal}
        // onClose={handleAddModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={CustomBackdrop_ConnectWallet}
      >
        <ModalBox>
          <HeadText01>
            <RiUserAddFill />
            <Box display={"flex"} ml={"10px"}>
              Add New User
            </Box>
          </HeadText01>
          <Input01
            component={"input"}
            {...{ placeholder: "Username" }}
            {...{ value: username }}
            onChange={(e: any) => {
              set_username(e.target.value);
            }}
          ></Input01>
          <Input01
            component={"input"}
            {...{ placeholder: "Email" }}
            {...{ value: email }}
            onChange={(e: any) => {
              set_email(e.target.value);
            }}
          ></Input01>
          <Input01
            component={"input"}
            {...{ placeholder: "Password" }}
            {...{ type: "password" }}
            {...{ value: password }}
            onChange={(e: any) => {
              set_password(e.target.value);
            }}
          ></Input01>
          <Input01
            component={"input"}
            {...{ placeholder: "Confirm password" }}
            {...{ type: "password" }}
            {...{ value: repassword }}
            onChange={(e: any) => {
              set_repassword(e.target.value);
            }}
          ></Input01>
          <GeneratePart>
            <GenerateButton
              onClick={() => {
                handleAddNewUser();
              }}
            >
              <Box
                display={"flex"}
                alignItems="center"
                justifyContent={"center"}
              >
                <FaRegAddressCard fontSize={"1.6rem"} fontWeight="bolder" />
              </Box>
              <Box
                display={"flex"}
                ml="10px"
                alignItems="center"
                justifyContent={"center"}
              >
                Add User
              </Box>
            </GenerateButton>
          </GeneratePart>
          <CloseBox01
            onClick={() => {
              handleAddModalClose();
              set_username("");
              set_email("");
              set_password("");
              set_repassword("");
            }}
          >
            <RiCloseCircleLine />
          </CloseBox01>
        </ModalBox>
      </Modal>
      <NotificationContainer />
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 50px 150px 50px 150px;
  box-sizing: border-box;
`;

const Workflow = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  color: white;
  background-color: #176180;
  overflow-y: auto;
  padding: 50px;
  box-sizing: border-box;
  flex-direction: column;
`;

const TablePart01 = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  height: 100%;
  .MuiTableCell-stickyHeader {
    background: #54c3e7;
    font-weight: 600;
    font-size: 1.2rem;
    color: white;
  }
  .MuiTableBody-root {
    background-color: white;
    overflow: auto;
  }
  .MuiTableCell-body {
    color: #176180;
    font-size: 1.2rem;
  }
  .MuiTableCell-root {
    border-bottom: 1px solid grey;
  }
  .MuiTableFooter-root {
    background: #54c3e7;
    font-weight: 600;
    font-size: 1.2rem;
    color: white;
  }
  .MuiTableContainer-root {
    box-shadow: none;
    border: none;
  }
  .MuiTableRow-root {
    &:hover {
      transition: 0.2s;
      background-color: rgba(0, 0, 0, 0.08) !important;
    }
  }
  .MuiTablePagination-root {
    min-height: 60px;
    background: #54c3e7;
  }
  .MuiTableHead-root {
    min-height: 60px;
  }
`;

const UserSearchAddBox = styled(Box)`
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: space-between;
  align-items: center;
`;

const AddNewUserBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBox = styled(Box)`
  display: flex;
`;

const AddButton01 = styled(Box)`
  display: flex;
  width: 140px;
  height: 40px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #54c3e7;
  /* border-radius: 8px; */
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    color: #176180;
    background-color: white;
  }
`;

const Editutton01 = styled(Box)`
  display: flex;
  width: 140px;
  height: 40px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #20b451;
  /* border-radius: 8px; */
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    color: #20b451;
    background-color: white;
  }
`;

const RemoveButton01 = styled(Box)`
  display: flex;
  width: 140px;
  height: 40px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #c52020;
  /* border-radius: 8px; */
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    color: #c52020;
    background-color: white;
  }
`;

const ModalBox = styled(Box)`
  display: flex;
  width: 350px;
  flex-direction: column;
  align-items: center;
  color: white;
  background-color: rgba(23, 97, 128, 0.85);
  border: none;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(100px) !important;
  padding: 30px;
  transition: box-shadow 300ms;
  transition: transform 505ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
  outline: none;
  animation: back_animation1 0.5s 1;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  @keyframes back_animation1 {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
  /* @media (max-width: 600px) {
    transition: 0.5s !important;
    width: 300px;
  }
  @media (max-width: 450px) {
    transition: 0.5s !important;
    width: 200px;
    height: 330px;
  } */
`;
const Input01 = styled(Box)`
  display: flex;
  width: 80%;
  border-radius: 0px;
  border: none;
  height: 50px;
  margin-top: 15px;
  font-size: 1.3rem;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid white;
  color: #176180;
  transition: 0.3s;
  &:hover {
    border: 2px solid #54c3e7;
  }
`;
const HeadText01 = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const CloseBox01 = styled(Box)`
  display: flex;
  color: white;
  transition: 0.5s;
  font-size: 2rem;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  &:hover {
    color: #9b9b9b;
  }
`;

const GeneratePart = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const GenerateButton = styled(Box)`
  display: flex;
  width: 80%;
  height: 50px;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #54c3e7;
  margin-top: 15px;
  margin-bottom: 20px;
  /* border-radius: 8px; */
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: #176180;
    background-color: white;
  }
`;

export const CustomBackdrop_ConnectWallet = styled(Box)`
  width: 100%;
  height: 100%;
  position: fixed;
  background: #000000;
  opacity: 0.8;
`;

export default Users;
