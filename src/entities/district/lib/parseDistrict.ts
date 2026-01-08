import type { District } from '../model/types';

export const parseDistrict = (districtString: string): District => {
    const districtParts = districtString.split('-');
    return {
        fullName: districtString,
        siDo: districtParts[0],
        siGunGu: districtParts[1] ?? undefined,
        eupMyeonDong: districtParts[2] ?? undefined,
        ri: districtParts[3] ?? undefined,
    };
};
