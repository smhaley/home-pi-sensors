import { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { SensorTopics } from "../constants/sensor-topics";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SettingsContext } from "../providers/settings-context";
import { UiSettings } from "../types/settings-data";

const topicNameMapping = {
  [SensorTopics.UPSTAIRS_ENV]: "Upstairs Environment",
  [SensorTopics.BOILER_TEMP]: "Boiler Temperature",
};

export default function Settings() {
  const [open, setOpen] = useState(false);
  const { settings, updateSettings } = useContext(SettingsContext);
  const [localSettings, setLocalSettings] = useState(settings);
  const [dirtySettings, setDirtySettings] = useState(settings);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.name as SensorTopics;
    const newValue = event.target.checked ? true : false;
    setDirtySettings({
      ...dirtySettings,
      [target]: newValue,
    } as UiSettings);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalSettings(dirtySettings);
    updateSettings && updateSettings(dirtySettings);
    handleClose(false);
  };

  useEffect(() => {
    settings && setLocalSettings(settings);
  }, []);

  const handleClose = (withoutSubmit: boolean) => {
    withoutSubmit && setDirtySettings(localSettings);
    setOpen(false);
  };

  const toggleSettings = () => {
    setOpen(!open);
  };

  return (
    <div>
      <>
        <Button sx={{ color: "white", m: 2 }} onClick={toggleSettings}>
          Settings
        </Button>
        <Dialog
          open={open}
          onClose={() => handleClose(true)}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) =>
              handleSubmit(event),
          }}
        >
          <DialogTitle>Sensor UI Settings</DialogTitle>
          <DialogContent>
            <DialogContentText>Set sensor topics to display.</DialogContentText>
            <FormGroup>
              {dirtySettings &&
                Object.values(SensorTopics).map((topic) => (
                  <FormControlLabel
                    key={topic}
                    onChange={(e) =>
                      handleChange(e as React.ChangeEvent<HTMLInputElement>)
                    }
                    name={topic}
                    control={
                      <Checkbox checked={dirtySettings[topic] ?? false} />
                    }
                    label={topicNameMapping[topic]}
                  />
                ))}
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(true)}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}
