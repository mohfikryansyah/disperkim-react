interface subdistrict {
    id: number;
    subdistrict_name: string;
}

export const subdistrict = (subdistrict: subdistrict[]) => {
    return subdistrict.map((subdistrict) => ({
        id: subdistrict.id,
        subdistrict_name: subdistrict.subdistrict_name,
    }));
};
