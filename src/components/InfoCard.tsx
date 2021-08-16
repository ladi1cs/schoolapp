import React, {useEffect, useState, ChangeEvent} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';

import { getCountries, getUniversities } from '../api/api';
import { University, UniversityColumns} from '../constants/common';
import { isValidArray } from '../utils/utils';

interface IInfoCardProps {
  data?: University,
  showAddBar: boolean,
  readOnly: boolean,
  onSave: any,
}

export default function InfoCard(props: IInfoCardProps) {
  const {data, showAddBar, readOnly} = props;
  const styles = useStyles();
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [university, setUniversity] = useState<University>();
  const [country, setCountry] = useState<string>('');

  useEffect(()=>{
    if(showAddBar){
      getCountries().then((res)=>{
        const list = res.map((c:any) => c.name);
        setCountries(list)
      });
    }
    else{
      setUniversity(data);
    }
  },[]);

  useEffect(()=>{
    if(showAddBar){
      getUniversities(country).then((res)=>{
        const list = res.map((u:any) => {return {
          website: u.web_pages[0],
          name: u.name,
          country: u.country,
          date: '',
          notes: ''}
        });
        setUniversities(list)
      });
    }
  },[country]);

  const renderCountries = () => {
    return (
      <>
        <InputLabel>Country</InputLabel>
        <Select value={country}
          onChange={(e:any) => setCountry(e.target.value as string)}
          className={styles.select}>
          {countries.map((c: string, index: number) => <MenuItem value={c}>{c}</MenuItem>)}
        </Select>
      </>);
  };

  const renderUniversities = () => {
    return (
      <>
        <InputLabel>University</InputLabel>
        <Select value={university}
          disabled={!country}
          onChange={(e:any) => onSelectUniversity(e.target.value as string)}
          className={styles.select}>
          {universities.map((u: University, index: number) => <MenuItem value={u.name}>{u.name}</MenuItem>)}
        </Select>
      </>
    );
  };

  const onSelectUniversity = (univName: string) =>{   
    if(isValidArray(universities)){
      setUniversity(universities.find((u:University) => u.name === univName));
    }
  };

  const onChangeData = (event: ChangeEvent<HTMLInputElement>, propName: string) => {
    const newUniversity: any = {...university};    
    newUniversity[propName] = event.target.value;
    setUniversity(newUniversity);
  };

  const validToSave = (): boolean =>{
    return !!(university && university.name && university.country && university.website);
  };

  return (
    <Card className={styles.root}>
      { props.showAddBar && 
        <>
          <CardContent>
            <Typography>Select University</Typography> 
            <div className={styles.addbar}>        
              {renderCountries()}
              {renderUniversities()}
            </div>
          </CardContent>
          <Divider />
        </>} 
        
      <CardContent className={styles.data}>
        <TextField className={styles.text} disabled
          label={UniversityColumns.NAME} 
          value={university ? university.name : ''} 
          onChange={(e:any)=>{onChangeData(e,'name')}} />
        <TextField className={styles.text} disabled
          label={UniversityColumns.COUNTRY} 
          value={university ? university.country : ''} 
          onChange={(e:any)=>{onChangeData(e,'country')}} />
        <TextField  className={styles.text} disabled
          label={UniversityColumns.WEBSITE} 
          value={university ? university.website : ''} 
          onChange={(e:any)=>{onChangeData(e,'website')}} />
        <TextField className={styles.text}
          id="date" type="date"
          disabled={readOnly}
          label={UniversityColumns.DATE}
          value={university ? university.date : ''}
          InputLabelProps={{ shrink: true }} 
          onChange={(e:any)=>{onChangeData(e,'date')}} />
        <TextField className={styles.text}
          disabled={readOnly}
          label={UniversityColumns.NOTES} 
          value={university ? university.notes : ''} 
          onChange={(e:any)=>{onChangeData(e,'notes')}} />
      </CardContent>
      { !readOnly && <CardActions>
        <Button className={styles.button}
          variant="contained"
          color="default"
          size="medium"
          disabled={!validToSave()}
          startIcon={<SaveIcon />}
          onClick={() => {props.onSave(university)}}>
          Save
        </Button>
      </CardActions>}
    </Card>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 375,
    },
    addbar: {
      display: 'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
    },
    data: {
      display: 'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
    },
    text: {
      margin: '15px 5px ',
      minWidth: '500px'
    },
    button: {
      flex: 1,
    },
    select:{
      minWidth: 160,
      margin: '5px 15px 20px 25px ',
    }
}));