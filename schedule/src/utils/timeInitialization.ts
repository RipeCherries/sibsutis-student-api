import TimeModel from '../models/timeModel';
import logger from './logger';

async function timeInitialization(): Promise<void> {
  try {
    const countRecords: number = await TimeModel.count();
    if (countRecords === 0) {
      await TimeModel.bulkCreate([
        { startHour: '08', startMinutes: '00', endHour: '09', endMinutes: '35' },
        { startHour: '09', startMinutes: '50', endHour: '11', endMinutes: '25' },
        { startHour: '11', startMinutes: '40', endHour: '13', endMinutes: '15' },
        { startHour: '13', startMinutes: '45', endHour: '15', endMinutes: '20' },
        { startHour: '15', startMinutes: '35', endHour: '17', endMinutes: '10' },
        { startHour: '17', startMinutes: '25', endHour: '19', endMinutes: '00' },
        { startHour: '19', startMinutes: '15', endHour: '20', endMinutes: '50' },
      ]);
    }
  } catch (e: any) {
    logger.error(`An error occurred while initializing the class time:\n${e}`);
  }
}

export default timeInitialization;
