import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sSelection } from '../../context/store';
import { Autocomplete } from '@mui/material';

import axios from 'axios';
import api from '../../../settings/api';

import './CountrySelect.css'

export default function CountrySelect() {
  const [selectedCountry, setSelectedCountry] = useState(null); // State lưu trữ quốc gia đã chọn
  const [inputValue, setInputValue] = useState(''); // State để lưu giá trị người dùng nhập

  const navigate = useNavigate(); // Khởi tạo navigate để điều hướng

  const handleCountryChange = (event, newValue) => {
    setSelectedCountry(newValue); // Cập nhật state với quốc gia đã chọn

  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue); // Cập nhật giá trị người dùng nhập
    console.log(newInputValue);
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      let countryToSearch = selectedCountry;

      // Nếu không chọn quốc gia từ danh sách, tìm quốc gia theo inputValue
      if (!countryToSearch && inputValue) {
        countryToSearch = countries.find(
          (country) => country.label.toLowerCase() === inputValue.toLowerCase()
        );
      }

      if (countryToSearch) {
        // Nếu tìm thấy quốc gia trong danh sách hoặc theo input, điều hướng
        sSelection.set((prev) => {
          prev.value.countryName = countryToSearch.label;
          prev.value.lat = countryToSearch.lat;
          prev.value.lon = countryToSearch.lon;
        });

        navigate(
          `/detail?search=${countryToSearch.label.replace(' ', '%20')}&lat=${countryToSearch.lat}&lon=${countryToSearch.lon}`
        );
      } else {
        // Nếu không tìm thấy quốc gia trong danh sách, gọi API để lấy lat và lon của thành phố từ input
        try {
          const response = await axios.get(`${api.apiCity(inputValue)}`); // Gọi API để lấy dữ liệu
          const data = response.data;
          console.log({ data }); // In ra dữ liệu để kiểm tra

          // Lấy lat và lon từ dữ liệu API trả về
          const lat = data.list[0].coord.lat;
          const lon = data.list[0].coord.lon;
          sSelection.set((prev) => {
            prev.value.countryName = inputValue;
            prev.value.lat = lat;
            prev.value.lon = lon;
          })

          // Điều hướng đến trang chi tiết với lat và lon của thành phố
          navigate(`/detail?search=${inputValue.replace(' ', '%20')}&lat=${lat}&lon=${lon}`);
        } catch (error) {
          console.error("Error fetching city data:", error);
          // Xử lý lỗi nếu API không trả về dữ liệu
        }
      }

    }
  };

  return (
    <>
      <Autocomplete
        id="country-select-demo"
        sx={{ width: 300 }}
        options={countries} // Danh sách các quốc gia
        autoHighlight
        getOptionLabel={(option) => option.label} // Đặt label cho từng quốc gia
        onChange={handleCountryChange} // Xử lý khi người dùng chọn quốc gia

        onInputChange={handleInputChange} // Xử lý khi người dùng nhập
        inputValue={inputValue} // Liên kết giá trị input

        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box

              key={key}
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            onKeyDown={handleKeyDown} // Xử lý sự kiện bấm phím
            slotProps={{
              htmlInput: {
                ...params.inputProps,
                // autoComplete: 'new-password', // Disable autocomplete and autofill if needed
              },
            }}
          />
        )}
      />

    </>
  );
}
const countries = [
  { code: 'US', label: 'United States', phone: '1', lat: 37.0902, lon: -95.7129 },
  { code: 'CA', label: 'Canada', phone: '1', lat: 56.1304, lon: -106.3468 },
  { code: 'GB', label: 'United Kingdom', phone: '44', lat: 55.3781, lon: -3.4360 },
  { code: 'FR', label: 'France', phone: '33', lat: 46.6034, lon: 1.8883 },
  { code: 'DE', label: 'Germany', phone: '49', lat: 51.1657, lon: 10.4515 },
  { code: 'IT', label: 'Italy', phone: '39', lat: 41.8719, lon: 12.5674 },
  { code: 'ES', label: 'Spain', phone: '34', lat: 40.4637, lon: -3.7492 },
  { code: 'JP', label: 'Japan', phone: '81', lat: 36.2048, lon: 138.2529 },
  { code: 'AU', label: 'Australia', phone: '61', lat: -25.2744, lon: 133.7751 },
  { code: 'IN', label: 'India', phone: '91', lat: 20.5937, lon: 78.9629 },
  { code: 'BR', label: 'Brazil', phone: '55', lat: -14.2350, lon: -51.9253 },
  { code: 'CN', label: 'China', phone: '86', lat: 35.8617, lon: 104.1954 },
  { code: 'RU', label: 'Russia', phone: '7', lat: 60.7558, lon: 100.6173 },
  { code: 'MX', label: 'Mexico', phone: '52', lat: 23.6345, lon: -102.5528 },
  { code: 'KR', label: 'South Korea', phone: '82', lat: 35.9078, lon: 127.7669 },
  { code: 'ZA', label: 'South Africa', phone: '27', lat: -30.5595, lon: 22.9375 },
  { code: 'AR', label: 'Argentina', phone: '54', lat: -38.4161, lon: -63.6167 },
  { code: 'EG', label: 'Egypt', phone: '20', lat: 26.8206, lon: 30.8025 },
  { code: 'NG', label: 'Nigeria', phone: '234', lat: 9.0820, lon: 8.6753 },
  { code: 'SA', label: 'Saudi Arabia', phone: '966', lat: 23.8859, lon: 45.0792 },
  { code: 'SE', label: 'Sweden', phone: '46', lat: 60.1282, lon: 18.6435 },

  { code: 'TH', label: 'Thailand', phone: '66', lat: 15.8700, lon: 100.9925 },
  { code: 'PK', label: 'Pakistan', phone: '92', lat: 30.3753, lon: 69.3451 },
  { code: 'VN', label: 'Vietnam', phone: '84', lat: 14.0583, lon: 108.2772 },


];
