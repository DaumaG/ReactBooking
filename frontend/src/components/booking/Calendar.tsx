import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const ResponsiveDatePickers = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'DatePicker'
          ]}
        >
            <div className="separate">
                <DesktopDatePicker defaultValue={dayjs(new Date())} />
               
            </div>
            </DemoContainer>
            <DemoContainer
            components={[
                'DatePicker'
            ]}
            >
                <TimePicker label="Time" />
             </DemoContainer>
      </LocalizationProvider>
    );
}

export default ResponsiveDatePickers;