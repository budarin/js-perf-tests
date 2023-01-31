// (X-x1)/(x2 - x1) = (Y- y1)/(y2 - y1) ===> Y = ((X - x1)/(x2 - x1))*(y2 - y1) + y1
// где
// x1, x2 - диапазон value (к примеру 0 - 2)
// y1, y2 - проценты ( к примеру 100 - 98)

export function initConverterValueToOpacity(maxPositive, maxNegative) {
    const maxPositiveDiff = maxPositive - 1001;
    const maxNegativeDiff = maxNegative - 1001;

    return function valueToColor(input) {
        const maxValue = input >= 0 ? maxPositive : maxNegative;
        const maxDiff = input >= 0 ? maxPositiveDiff : maxNegativeDiff;
        const value = Math.abs(input);

        switch (true) {
            // 0 - 3%
            case value >= 0 && value <= 2:
                return (value / 2) * 3;

            // 4 - 6
            case value >= 3 && value <= 10:
                return ((value - 3) / 7) * 2 + 4;

            // 7 - 50
            case value >= 11 && value <= 100:
                return ((value - 11) / 89) * 43 + 7;

            // 51-80%
            case value >= 101 && value <= 1000:
                return ((value - 101) / 899) * 29 + 51;

            // 81 - 100%
            case value >= 1001 && value <= maxValue:
                return ((value - 1001) / maxDiff) * -19 + 81;

            default:
                return 0;
        }
    };
}
