import districtsData from './korea_districts.json';
import { parseDistrict } from './parseDistrict';
import type { District } from '../model/types';

export const loadDistricts = (): District[] => {
    const cachedDistricts: District[] = districtsData.map(parseDistrict);
    return cachedDistricts;
};
