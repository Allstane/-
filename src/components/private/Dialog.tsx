import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import {Chapter} from './../data/Chapter'
import {instance} from './../AxiosInstance'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullDialog(chapter: Chapter) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
    console.log('Message var = ' + message)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateChapter(chapter)
    setOpen(false);
  };

  function updateChapter(chapter: Chapter) {
    const newChapter: Chapter = {id: chapter.id, book: chapter.book, title: chapter.title, head: chapter.head, txt: message}
    console.log('New chapter = ' + newChapter)
    const json = JSON.stringify(newChapter)
    console.log('Json chapter = ' + json)
    instance.post('/update', json, {headers: {'Content-Type': 'application/json'}})
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit text
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>{chapter.title}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="chapterTxt"
            label="Chapter"
            multiline
            type="text"
            fullWidth
            variant="standard"
            defaultValue={chapter.txt}
            onChange={handleChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
