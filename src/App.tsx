import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import InfoCard from './components/InfoCard';
import Popup from './components/Popup';
import Fab from '@material-ui/core/Fab';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import { PopupTitle, EventType, University } from './constants/common';
import { isValidArray } from './utils/utils';
import Tooltip from '@material-ui/core/Tooltip';

export default function App() {
  const [toastMsg, setToastMsg] = useState<string>('');
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [updateType, setUpdateType] = useState<EventType>(EventType.None);
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  useEffect(()=>{
    if(!isValidArray(universities)){
      setSelectedRecord(null);
    }
  },
  [universities]);

  const onOpenEdit = (evType: EventType) => {
    setUpdateType(evType); 
    
    if((evType === EventType.Edit || evType === EventType.View) &&
      !selectedRecord){
        return;
    }  
    
    setOpenEdit(true);
  };

  const onCloseEdit = () => {
    setOpenEdit(false);
  };

  const onCloseToast = () => {
    setOpenToast(false);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setOpenToast(true);
  };

  const onSelectRecord = (record: any) => {
    setSelectedRecord(record);
  };

  const onUpdate = (record: University) => {
    const recIndex = universities.findIndex((u:University) => u.name === record.name);
    if(updateType === EventType.Add){
      if(recIndex >= 0 ){
        showToast(`Error: ${record.name} already exists in your list!`);
      }
      else{
        setUniversities([...universities, record]);
        showToast(`${record.name} was added to your list`);
      }    
    }
    else if(updateType === EventType.Edit && recIndex >=0){
      const newList = [...universities];
      newList[recIndex] = record;
      setUniversities(newList);
      showToast(`${record.name} record was updated`);
    }
    
    setOpenEdit(false);
  };

  const onDelete = () => {
    if(selectedRecord){
      const newList = universities.filter((u:University) => selectedRecord && u.name !== selectedRecord.name);
      setUniversities(newList);
      showToast(`${selectedRecord.name} was deleted`);
    }
  };

  const styles = useStyles();

  return (    
    <div className={styles.root}>
      <Header title='My Applications' 
        disableBtns={!selectedRecord}
        onView={()=> onOpenEdit(EventType.View)} 
        onEdit={()=> onOpenEdit(EventType.Edit)} 
        onDelete={onDelete}/>
      <Grid records={universities} onSelect={onSelectRecord}/>
      <Popup title={PopupTitle[updateType]} show={openEdit} onCloseClick={onCloseEdit}>
        <InfoCard 
          showAddBar={updateType === EventType.Add}
          readOnly={updateType === EventType.View} 
          data={selectedRecord!}
          onSave={onUpdate}/>
      </Popup>
      <Tooltip title="Add new application">
        <Fab color="secondary" aria-label="add" 
          className={styles.fabButton} 
          onClick={()=>onOpenEdit(EventType.Add)}>
            <AddIcon />
        </Fab>
      </Tooltip>
      <Snackbar open={openToast} autoHideDuration={5000} onClose={onCloseToast} message={toastMsg}/>    
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      marginLeft: '40%',
    },
    title: {
      flexGrow: 1,
      alignSelf: 'center',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },   
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      bottom: 50,
      right: 50,
      margin: '0 auto',
    },
  }),
);