
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Check } from 'lucide-react';
import { format } from 'date-fns';

interface LogData {
  date: string;
  weight: number;
  waist: number;
}

interface CalendarViewProps {
  logs: LogData[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ logs }) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const year = selectedMonth.getFullYear();
  const month = selectedMonth.getMonth();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  const prevMonth = () => {
    setSelectedMonth(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };
  
  const nextMonth = () => {
    setSelectedMonth(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };
  
  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
  };
  
  const getLogForDate = (day: number): LogData | undefined => {
    const dateString = new Date(year, month, day).toISOString().split('T')[0];
    return logs.find(log => log.date.startsWith(dateString));
  };
  
  const hasLogForDate = (day: number): boolean => {
    return !!getLogForDate(day);
  };
  
  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const currentDay = today.getDate();
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-10 sm:h-14"></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === currentDay;
      const isSelected = selectedDate?.getDate() === day && 
                         selectedDate?.getMonth() === month && 
                         selectedDate?.getFullYear() === year;
      const hasLog = hasLogForDate(day);
      
      days.push(
        <div 
          key={day}
          className={`h-10 sm:h-14 flex flex-col items-center justify-center relative cursor-pointer rounded-full transition-colors
            ${isToday ? 'font-semibold' : ''}
            ${isSelected ? 'bg-sanamana-green text-white' : 'hover:bg-sanamana-green-light'}
          `}
          onClick={() => handleDateClick(day)}
        >
          <span>{day}</span>
          {hasLog && !isSelected && (
            <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-sanamana-green"></span>
          )}
          {hasLog && isSelected && (
            <Check size={12} className="absolute bottom-1" />
          )}
        </div>
      );
    }
    
    return days;
  };
  
  const selectedLog = selectedDate ? getLogForDate(selectedDate.getDate()) : undefined;
  
  return (
    <div className="sanamana-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium flex items-center">
          <CalendarIcon size={20} className="mr-2" />
          Progress Calendar
        </h2>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <div className="font-medium">
          {format(selectedMonth, 'MMMM yyyy')}
        </div>
        
        <button 
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-gray-500">
        <div className="text-center">Sun</div>
        <div className="text-center">Mon</div>
        <div className="text-center">Tue</div>
        <div className="text-center">Wed</div>
        <div className="text-center">Thu</div>
        <div className="text-center">Fri</div>
        <div className="text-center">Sat</div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
      
      {selectedLog && (
        <div className="mt-6 p-4 border border-gray-100 rounded-xl bg-gray-50">
          <h3 className="font-medium mb-2">
            {format(new Date(selectedLog.date), 'MMMM d, yyyy')}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Weight</div>
              <div className="font-medium">{selectedLog.weight} kg</div>
            </div>
            <div>
              <div className="text-gray-500">Waist</div>
              <div className="font-medium">{selectedLog.waist} cm</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
