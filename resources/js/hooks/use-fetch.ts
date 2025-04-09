import { useEffect, useState } from "react";
import axios from 'axios';

interface DistrictResponse {
    id: string;
    regency_id: string;
    name: string;
}    
    
export const useDistrict = () => {
    const [districts, setDistricts] = useState<DistrictResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
  const [error, setError] = useState<string | null>(null);

    const fetchDistrict = async () => {
        setLoading(true);

        try {
            let url = `/api/proxy/districts/7571`;
            const response = await axios.get(url);
            setDistricts(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch districts ' + error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDistrict();
    }, [])

    return { districts, error, loading };
};

export const useSubdistrict = (subdistrict_id: number) => {
    const [subdistricts, setSubdistricts] = useState<DistrictResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
  const [error, setError] = useState<string | null>(null);

    const fetchSubdistrict = async () => {
        setLoading(true);
        try {
            let url = `/api/proxy/villages/${subdistrict_id}`;
            const response = await axios.get(url);
            setSubdistricts(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch villages');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (subdistrict_id) fetchSubdistrict();
    }, [subdistrict_id])

    return { subdistricts, error, loading };
}
    