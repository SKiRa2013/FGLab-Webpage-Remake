export const DateConversion = ({ dateString }) => {
    if (!dateString) return "";

    // Si el string no trae 'Z' ni offset (+00:00), se lo agregamos para que JS sepa que viene en UTC
    const utcString = dateString.endsWith("Z") || dateString.includes("+")
        ? dateString
        : `${dateString}Z`;

    const date = new Date(utcString);

    const pad = (n) => String(n).padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};
