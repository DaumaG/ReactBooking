import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import '../../styles/calendarstyle.scss';

const ResponsiveDatePickers = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'DatePicker'
          ]}
        >
        <div className="rightAlignedDemoItem">  
          <DemoItem> 
            <StaticDatePicker defaultValue={dayjs('2024-07-23')} />
          </DemoItem>
          </div>
        </DemoContainer>
      </LocalizationProvider>
    );
}

export default ResponsiveDatePickers;