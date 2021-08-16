import * as React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { UniversityColumns} from '../constants/common';
import { isValidArray } from '../utils/utils';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: UniversityColumns.NAME,
    width: 300,
    editable: false,
  },
  {
    field: 'country',
    headerName: UniversityColumns.COUNTRY,
    width: 200,
    editable: false,
  },
  {
    field: 'website',
    headerName: UniversityColumns.WEBSITE,
    width: 250,
    editable: false,
  },
  {
    field: 'date',
    headerName: UniversityColumns.DATE,
    width: 200,
    editable: false,
  },
  {
    field: 'notes',
    headerName: UniversityColumns.NOTES,
    width: 400,
    editable: false,
  }
];

interface IGridProps {
  records: any,
  onSelect: any,
}

export default function Grid(props: IGridProps) {
  const styles = useStyles();
  const {records, onSelect} = props;

  const getRecords = () =>{
    if(records && isValidArray(records)){
      return records.map((rec: any, index: number) =>{
        return {...rec, id: index+1};
      });
    }

    return[];
  }

  return (
    <div className={styles.root}>
      <DataGrid
        rows={getRecords()}
        columns={columns}
        onRowClick={(param) => {
          onSelect(param.row);
        }}
        isCellEditable={params => false}
      />
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 400, 
      width: '100%'
    },
  }),
);
