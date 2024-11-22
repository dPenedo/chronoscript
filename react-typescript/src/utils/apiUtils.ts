// URLs
export const URLForListOfCities =
    'https://timeapi.io/api/timezone/availabletimezones';
export const URLForGettingTheTimeZone =
    'https://timeapi.io/api/timezone/zone?timeZone=';
export const fetchTimeZone = async (selectedCity: string) => {
    const encodedCity = encodeURIComponent(selectedCity.toLowerCase()); // Codifica el nombre de la ciudad
    try {
        const response = await fetch(
            `${URLForGettingTheTimeZone}${encodedCity}`,
        );
        const data = await response.json();
        console.log(
            `time zone offset minutes => ${data.standardUtcOffset.seconds / 60}`,
        );
        return data.standardUtcOffset.seconds / 60; // Establece el offset en minutos
    } catch (error) {
        console.error('Error:', error);
        console.log(
            `Failed to access:${URLForGettingTheTimeZone}${encodedCity}`,
        );
        throw new Error(
            "Oops! Something went wrong. The time data couldn't be loaded from timeApi.io server. Please try again later.",
        );
    }
};

export const fetchListOfCities = async () => {
    try {
        const response = await fetch(URLForListOfCities);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error:' + error);
    }
};
