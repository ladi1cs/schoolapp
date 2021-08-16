import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/AnnouncementOutlined';
import Tooltip from '@material-ui/core/Tooltip';

interface IHeaderProps {
  title: string,
  onView: any,
  onEdit: any,
  onDelete: any,
  disableBtns: boolean,
}

export default function Header(props: IHeaderProps) {
  const styles = useStyles();

  const {title, onView, onEdit, onDelete, disableBtns} = props;
  
  return (    
      <div className={styles.root}>
        <AppBar position="static">
          <Toolbar className={styles.toolbar}>
            <Typography className={styles.title} variant="h4" noWrap>
              {title}
            </Typography>
            <>
              <Tooltip title="View application">
                <IconButton aria-label="view" color="inherit" disabled={disableBtns} onClick={onView}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit application">  
                <IconButton aria-label="edit" color="inherit" disabled={disableBtns} onClick={onEdit}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete application">
                <IconButton aria-label="delete" color="inherit" disabled={disableBtns} onClick={onDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          </Toolbar>
        </AppBar>
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
  }),
);
