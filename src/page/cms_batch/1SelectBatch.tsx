import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import { download_batch } from '../../redux/actions/production';
import { get_batch_list, get_batch_data } from '../../redux/actions/production';
import { RiFolderDownloadLine } from 'react-icons/ri';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useWallet } from '@solana/wallet-adapter-react';

// table - start
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
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
        {theme.direction === 'rtl' ? (
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
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

// table - end

const SelectBatch = ({
  set_flag_step_batch,
  set_sproduction_name,
  set_sBatchName,
  set_sBatchData,
  setFlagStep,
  setId,
  setErrorMsg
}: any) => {
  const [batch_list, set_batch_list] = useState<any>();
  const [batch_num, set_batch_num] = useState<any>(0);
  const [batch_data, set_batch_data] = useState<any>();
  const [production_name, set_production_name] = useState<any>('');
  const [flag_downbtn, set_flag_downbtn] = useState<any>(false);
  const wallet = useWallet();

  const download = () => {
    if (!wallet.connected)
    {
      NotificationManager.error('Please connect wallet!', 'Hi.', 3000);
      return;
    }
    if (production_name === '') {
      NotificationManager.error('Please input production name!', 'Hi.', 3000);
      return;
    }
    if (batch_list === undefined||batch_list.length === 0) {
      NotificationManager.error("Can't get any batch list in cms!", 'Hi.', 3000);
      return;
    }
    if (batch_data === undefined) {
      NotificationManager.error("Can't get any batch data in cms!", 'Hi.', 3000);
      return;
    }
    set_flag_downbtn(true);
    if (flag_downbtn === true) {
      NotificationManager.error('Please wait while processing.', 'Hi.', 3000);
      return;
    }
    set_flag_step_batch(1);
    let batch_list_data: any = [];
    for (var i = 0; i < Object.keys(batch_data).length; i++) {
      batch_list_data.push({
        id: batch_data[i].id,
        image: batch_data[i].image,
      });
    }

    set_sBatchData(batch_data);
    const user1:any = localStorage.getItem('jwtToken');
    const username: any = (jwtDecode(user1) as any).username;
    const wallet_address:any = wallet.publicKey?.toBase58();
    download_batch(username,wallet_address, production_name,batch_list[batch_num], batch_list_data).then(res => {
      if (res.flag_success === 'success') {
        set_flag_step_batch(2);
        set_flag_downbtn(false);
        setFlagStep(1);
        setId(res.id);
      } else if (res.flag_success === 'failed') {
        set_flag_step_batch(3);
        set_flag_downbtn(false);
        setErrorMsg(res.error_msg);
        setFlagStep(0);
      }
    });
  };

  // table - start
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      batch_data && Object.keys(batch_data).length - page * rowsPerPage,
    );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // table - end
  useEffect(() => {
    get_batch_list().then(res => {
      if (res.flag_success === 'success') {
        let batch_list = [];
        for (var i = 1; i < Object.keys(res.batch_list).length; i++) {
          batch_list.push(res.batch_list[i]);
        }
        set_batch_list(batch_list);
        set_sBatchName(batch_list[batch_num]);
      }
      else if (res.flag_success === 'failed') {
        set_flag_step_batch(3);
        set_flag_downbtn(false);
        setErrorMsg(res.error_msg);
        setFlagStep(0);
      }
    });
    get_batch_data(batch_num).then(res => {
      if (res.flag_success === 'success') {
        set_batch_data(res.batch_data);
      }
      else if (res.flag_success === 'failed') {
        set_flag_step_batch(3);
        set_flag_downbtn(false);
        setErrorMsg(res.error_msg);
        setFlagStep(0);
      }
    });
  },[]);

  return (
    <StyledComponent>
      <InputSelect>
        <InputProduction>
          <Text01>Production Name:</Text01>
          <InputTag
            component={'input'}
            {...{ value: production_name }}
            {...{ placeholder: 'input name here.' }}
            onChange={(e: any) => {
              set_sproduction_name(e.target.value);
              set_production_name(e.target.value);
            }}
          ></InputTag>
        </InputProduction>
        <SelectBacthPart>
          <Text01>Select Batch:</Text01>
          <Select01>
            <FormControl fullWidth>
              <Select
                value={batch_num}
                onChange={(e: any) => {
                  set_sBatchName(batch_list[e.target.value]);
                  set_batch_num(e.target.value);
                  get_batch_data(e.target.value).then(data => {
                    set_batch_data(data);
                    // set_sBatchData(data);
                  });
                }}
              >
                {batch_list &&
                  batch_list.map((each: any, index: any) => {
                    return (
                      <MenuItem key={index} value={index}>
                        {each}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Select01>
        </SelectBacthPart>
        {/* <GenerateButton >Upload to AWS</GenerateButton> */}
      </InputSelect>
      <BatchTable01>
        {/* <Text01>Batch Data:</Text01> */}
        <TablePart01>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              aria-label="custom pagination table"
              stickyHeader
              style={{height: '100%', background: 'white'}}
            >
              <TableHead>
                <TableRow>
                  <TableCell width="5%">ID</TableCell>
                  <TableCell width="10%">City</TableCell>
                  <TableCell width="22%">Location</TableCell>
                  <TableCell width="18%">Address</TableCell>
                  <TableCell width="15%">Area</TableCell>
                  <TableCell width="10%">Rarity</TableCell>
                  <TableCell width="15%">Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {batch_data!== undefined &&
                  (rowsPerPage > 0
                    ? batch_data.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                    : batch_data
                  ).map((each: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell width="5%">{each.id}</TableCell>
                      <TableCell width="10%">{each.city}</TableCell>
                      <TableCell width="22%">{each.loc}</TableCell>
                      <TableCell width="18%">{each.address}</TableCell>
                      <TableCell width="15%">{each.area}</TableCell>
                      <TableCell width="10%">{each.rarity}</TableCell>
                      <TableCell width="15%">{each.image.slice(-12)}</TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 50 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={7}
                    count={batch_data? Object.keys(batch_data).length:0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </TablePart01>
      </BatchTable01>
      <GeneratePart>
        <GenerateButton
          onClick={() => {
            download();
          }}
        >
          <RiFolderDownloadLine fontSize={'1.5rem'} fontWeight={'bolder'} />
          <Box display={'flex'} ml="5px">
            DOWNLOAD
          </Box>
        </GenerateButton>
      </GeneratePart>
      <NotificationContainer />
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  /* align-items: center; */
`;

const InputSelect = styled(Box)`
  display: flex;
  width: 100%;
  height: 50px;
`;
const InputProduction = styled(Box)`
  display: flex;
  color: white;
  align-items: center;
  font-size: 1.5rem;
`;
const InputTag = styled(Box)`
  display: flex;
  outline: none;
  border: 0px;
  width: 200px;
  height: 30px;
  border: 2px solid white;
  font-size: 1.3rem;
  color: #176180;
  transition: 0.3s;
  margin-left: 10px;
  &:hover {
    border: 2px solid #54c3e7;
  }
`;
const SelectBacthPart = styled(Box)`
  display: flex;
  margin-left: 50px;
  color: white;
  align-items: center;
  font-size: 1.5rem;
`;

const Select01 = styled(Box)`
  display: flex;
  margin-left: 10px;
  /* border-radius: 8px; */
  height: 30px;
  align-items: center;
  font-size: 1.3rem;
  width: 250px;
  &:hover {
    transition: 0.3s;
  }
  .MuiPaper-root {
    background-color: white !important;
    color: black !important;
  }
  .MuiInput-underline:after {
    border-bottom: 2px solid white;
  }
  .MuiFormLabel-root.Mui-focused {
    color: white;
  }
  .Mui-selected {
    font-size: 1.3rem;
    font-weight: bold;
  }
  .MuiInputBase-root {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const Text01 = styled(Box)`
  display: flex;
  align-items: center;
  color: white;

  font-size: 1.3rem;
`;

const BatchTable01 = styled(Box)`
  display: flex;
  width: 100%;
  flex: 1;
  margin-top: 10px;
  flex-direction: column;
  overflow-y: auto;
`;

const GeneratePart = styled(Box)`
  display: flex;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  justify-content: center;
  align-items: flex-end;
`;

const GenerateButton = styled(Box)`
  display: flex;
  width: 200px;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #54c3e7;
  /* border-radius: 8px; */
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    color: #176180;
    background-color: white;
  }
`;

const TablePart01 = styled(Box)`
  display: flex;
  flex: 1;
  margin-top: 10px;
  width: 100%;
  overflow:auto;
  .MuiTableCell-stickyHeader{
    background: #54c3e7;
    font-weight: 600;
    font-size: 1.2rem;
    color: white;
  }
  .MuiTableBody-root{
    background-color: white;
  }
  .MuiTableCell-body{
    color:#176180;
    /* font-size: 1.2rem; */
  }
  .MuiTableCell-root{
    border-bottom: 1px solid grey;
  }
  .MuiTableFooter-root{
    background: #54c3e7;
    font-weight: 600;
    font-size: 1.2rem;
    color: white;
  }
  .MuiTableContainer-root{
    box-shadow: none;
    border: none;
  }
  .MuiTableRow-root{
    &:hover{
      background-color: rgba(0,0,0,0.08);
    }
  }
`
export default SelectBatch;
