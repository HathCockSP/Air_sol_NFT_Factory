import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import _ from 'lodash';
import styled from 'styled-components';
import { uploadLocal } from '../../redux/actions/production';
import { RiFolderUploadLine } from 'react-icons/ri';
import { FaAws } from 'react-icons/fa';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

// import clsx from 'clsx';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import { StringLiteral } from 'typescript';

interface Data {
  id: string;
  city: string;
  location: string;
  address: string;
  area: string;
  rarity: string;
  image: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  { id: 'city', numeric: false, disablePadding: false, label: 'City' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
  { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
  { id: 'area', numeric: false, disablePadding: false, label: 'Area' },
  { id: 'rarity', numeric: false, disablePadding: false, label: 'Rarity' },
  { id: 'image', numeric: false, disablePadding: false, label: 'Image' },
];

// const headCells: HeadCell[] = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: true,
//     label: 'Dessert (100g serving)',
//   },
//   { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//   { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//   { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//   { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
// ];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  batch_name: string;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected, batch_name } = props;

  return (
    <Toolbar
    // className={clsx(classes.root, {
    //   [classes.highlight]: numSelected > 0,
    // })}
    style={{background:'#54c3e7'}}
    >
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Batch Table: {batch_name} ({numSelected} selected)
      </Typography>
      {/* <Tooltip title="Filter list">
        
        <IconButton aria-label="filter list">
          <FilterListIcon />{numSelected} selected
        </IconButton>
      </Tooltip> */}
      {/* {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Batch Table:
        </Typography>
      )} */}
      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    container: {
      maxHeight: "500px",
      minHeight: "300px",
    },
  }),
);

// type BatchProps = {
//   set_flag_step_batch: (params: any) => void;
// };

const UploadBatch = ({
  id,
  sBatchName,
  sBatchData,
  set_flag_step_upload,
  set_sSelectedIDs,
  setFlagStep,
  setErrorMsg
}: any) => {
  const [flag_downlocalbtn, set_flag_downlocalbtn] = useState<any>(false);

  const upload_aws = () => {
    NotificationManager.warning('Coming soon.', 'Hi.', 3000);
    return;
  };

  const upload_local = () => {
    set_flag_downlocalbtn(true);
    if (flag_downlocalbtn === true) {
      NotificationManager.error('Please wait while processing.', 'Hi.', 3000);
      return;
    }
    set_flag_step_upload(1);
    let batch_list_data: any = [];
    for (var i = 0; i < Object.keys(sBatchData).length; i++) {
      batch_list_data.push({
        id: sBatchData[i].id,
        config_url: "https://air-client-portal-dev.make-project.fun/building/config/"+sBatchData[i].id,
        meta_url: "https://air-client-portal-dev.make-project.fun/building/meta/"+sBatchData[i].id,
        image: sBatchData[i].image,
      });
    }

    const selected_batch: any = _.filter(batch_list_data, each =>
      _.includes(selected, each.id),
    );
    uploadLocal(id ,sBatchName, selected_batch).then(res => {
      if (res.flag_success === 'success') {
        set_flag_step_upload(2);
        set_flag_downlocalbtn(false);
        setFlagStep(2);
      } else if (res.flag_success === 'failed') {
        setErrorMsg(res.error_msg);
        set_flag_step_upload(3);
        set_flag_downlocalbtn(false);
        setFlagStep(1);
      }
    });
  };

  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('city');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = sBatchData && sBatchData.map((each: any) => each.id);
      setSelected(newSelecteds);
      set_sSelectedIDs(newSelecteds.length)
      return;
    }
    set_sSelectedIDs(0)
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    set_sSelectedIDs(newSelected.length);
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      sBatchData && Object.keys(sBatchData).length - page * rowsPerPage,
    );

  useEffect(() => {
    if (sBatchData === null) {
      return;
    }
    let newSelecteds = sBatchData && sBatchData.map((each: any) => each.id);
    set_sSelectedIDs(newSelecteds.length);
    setSelected(newSelecteds);
  }, [sBatchData]);

  return (
    <StyledComponent>
      <BatchTable01>
        <TablePart01>
        {/* <Text01>Batch Data:</Text01> */}

          {/* <Paper className={classes.paper}> */}
            <EnhancedTableToolbar
              numSelected={sBatchData && selected.length}
              batch_name={sBatchName}
            />
            <TableContainer className={classes.container}>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'medium' : 'small'}
                aria-label="enhanced table"
                stickyHeader
                style={{ height: "100%", background: "white" }}
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={sBatchData && selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={sBatchData && Object.keys(sBatchData).length}
                />
              <TableBody style={{ overflow: "auto" }}>
                  {sBatchData &&
                    stableSort(sBatchData, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((each: any, index: any) => {
                        const isItemSelected = isSelected(each.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={event => handleClick(event, each.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={index}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox" width={'3%'}>
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              width="10%"
                            >
                              {each.id}
                            </TableCell>
                            <TableCell width="10%">{each.city}</TableCell>
                            <TableCell width="22%">{each.loc}</TableCell>
                            <TableCell width="17%">{each.address}</TableCell>
                            <TableCell width="15%">{each.area}</TableCell>
                            <TableCell width="10%">{each.rarity}</TableCell>
                            <TableCell width="13%">
                              {each.image.slice(-12)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 30 : 50) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
            
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              component="div"
              count={sBatchData && Object.keys(sBatchData).length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          {/* </Paper> */}
          {/* <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          /> */}
          </TablePart01>
      </BatchTable01>
      <GeneratePart>
        <GenerateButton
          onClick={() => {
            upload_aws();
          }}
        >
          <FaAws fontSize={'1.8rem'} fontWeight={'800'} />
          <Box display={'flex'} ml="5px">
            AWS
          </Box>
        </GenerateButton>
        <GenerateButton
          onClick={() => {
            upload_local();
          }}
        >
          <RiFolderUploadLine fontSize={'1.5rem'} fontWeight={'bolder'} />
          <Box display={'flex'} ml="5px">
            LOCAL
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
  flex-direction: column;
  /* align-items: center; */
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
  margin-left: 20px;
  margin-right: 20px;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #54c3e7;
  /* border-radius: 8px; */
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: #176180;
    background-color: white;
  }
`;


const TablePart01 = styled(Box)`
  display: flex;
  flex: 1;
  margin-top: 10px;
  width: 100%;
  overflow: auto;
  flex-direction: column;
  .MuiTableCell-stickyHeader {
    background: #54c3e7;
    font-weight: 600;
    font-size: 1.2rem;
    color: white;
  }
  .MuiTableBody-root {
    background-color: white;
  }
  .MuiTableCell-body {
    color: #176180;
    /* font-size: 1.2rem; */
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
      background-color: rgba(0, 0, 0, 0.08);
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
export default UploadBatch;
