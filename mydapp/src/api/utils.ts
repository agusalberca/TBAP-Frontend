const { REACT_APP_URL_BACK } = process.env;

export const add_base_url = (url: string) => {
    let final_url = ''
    if (url){
        final_url = `${REACT_APP_URL_BACK}${url}`
    }
  return final_url;
};

export const convert_epoch_to_date = (epoch: number) => {
    const date = new Date(epoch * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}