import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DataGrid from "./DataGrid";
import Api from "./utils/api";

const Pairing = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [apiData, setApiData] = useState([{}]);
  const location = useLocation();
  let cryptoValue = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  let title = "Welcome to Pairing ".concat(cryptoValue);
  const [changeValue, setChangeValue] = useState(true);
  let currencyArray: any[] = [];
  const [showFiat, setShowFiat] = useState(false);
  const [newCurrArr, setNewCurrArr] = useState([""]);
  const [displayData, setDisplay] = useState([]);
  const [toggleValue, setToggleValue] = useState("Show in Percent");
  let defaultSelected = "";
  let newArr: any = [];
  const seen = new Set();

  const removeDuplicates = (arr: any) => {
    return arr.filter((item: any, index: any) => arr.indexOf(item) === index);
  };

  // Calling the api
  useEffect(() => {
    async function getData() {
      try {
        let newcryptoValue =
          cryptoValue.length > 4 ? cryptoValue.slice(0, -3) : cryptoValue;
        await Api.getData(
          `/indices/local/ticker/all?crypto=${newcryptoValue}`
        ).then((res) => {
          let arr = res.data;
          const valuesOfArray = Object.values(arr);
          valuesOfArray.forEach((x: any) => {
            newArr.push(x);
            currencyArray.push(
              x.display_symbol.substring(x.display_symbol.length - 3)
            );
          });
          currencyArray = removeDuplicates(currencyArray);
          setShowFiat(true);
          setNewCurrArr(currencyArray);
          //if length>4, filternewARR for CAD data ex, else setApi(newArr);
          if (cryptoValue.length > 4) {
            filterApiData(cryptoValue, newArr);
          } else {
            setApiData(newArr);
          }
          setDisplay(newArr);
          setLoadingData(false);
        });
      } catch (err: any) {
        console.log(err);
      }
    }
    if (loadingData) {
      getData();
    }
  }, [loadingData]);

  //Loading columns for price
  const columns = React.useMemo(
    () => [
      {
        Header: "Pairings",
        accessor: "display_symbol",
      },
      {
        Header: "Day Average",
        accessor: "averages.day",
        Cell: ({ row }: any) => {
          let avValue = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.averages.day) {
              avValue = parseFloat(row.original.averages.day).toFixed(3);
              avValue = avValue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          }
          return (
            <>
              <p>{avValue}</p>
            </>
          );
        },
      },
      {
        Header: "Weekly Average",
        accessor: "averages.week",
        Cell: ({ row }: any) => {
          let avValue = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.averages.week) {
              avValue = parseFloat(row.original.averages.week).toFixed(3);
              avValue = avValue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          }
          return (
            <>
              <p>{avValue}</p>
            </>
          );
        },
      },
      {
        Header: "Month Average",
        accessor: "averages.month",
        Cell: ({ row }: any) => {
          let avValue = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.averages.month) {
              avValue = parseFloat(row.original.averages.month).toFixed(3);
              avValue = avValue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          }
          return (
            <>
              <p>{avValue}</p>
            </>
          );
        },
      },
      {
        Header: "Hourly Change",
        accessor: "changes.price.hour",
        Cell: ({ row }: any) => {
          let percentValue = "";
          let colorCell = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.changes.price.hour) {
              let parsedVal = parseFloat(
                row.original.changes.price.hour
              ).toFixed(3);
              parsedVal = parsedVal
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if (row.original.changes.price.hour > 0) {
                percentValue = "+" + parsedVal;
                colorCell = "green";
              } else {
                percentValue = parsedVal;
                colorCell = "red";
              }
            }
          }
          return (
            <>
              <p style={{ color: colorCell }}>{percentValue}</p>{" "}
            </>
          );
        },
      },
      {
        Header: "Daily Change",
        accessor: "changes.price.day",
        Cell: ({ row }: any) => {
          let percentValue = "";
          let colorCell = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.changes.price.day) {
              let parsedVal = parseFloat(
                row.original.changes.price.day
              ).toFixed(3);
              parsedVal = parsedVal
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if (row.original.changes.price.day > 0) {
                percentValue = "+" + parsedVal;
                colorCell = "green";
              } else {
                percentValue = parsedVal;
                colorCell = "red";
              }
            }
          }
          return (
            <>
              <p style={{ color: colorCell }}>{percentValue}</p>{" "}
            </>
          );
        },
      },
      {
        Header: "Weekly Change",
        accessor: "changes.price.week",
        Cell: ({ row }: any) => {
          let percentValue = "";
          let colorCell = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.changes.price.week) {
              let parsedVal = parseFloat(
                row.original.changes.price.week
              ).toFixed(3);
              parsedVal = parsedVal
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if (row.original.changes.price.week > 0) {
                percentValue = "+" + parsedVal;
                colorCell = "green";
              } else {
                percentValue = parsedVal;
                colorCell = "red";
              }
            }
          }
          return (
            <>
              <p style={{ color: colorCell }}>{percentValue}</p>{" "}
            </>
          );
        },
      },
      {
        Header: "Monthly Change",
        accessor: "changes.price.month",
        Cell: ({ row }: any) => {
          let percentValue = "";
          let colorCell = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.changes.price.month) {
              let parsedVal = parseFloat(
                row.original.changes.price.month
              ).toFixed(3);
              parsedVal = parsedVal
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if (row.original.changes.price.month > 0) {
                percentValue = "+" + parsedVal;
                colorCell = "green";
              } else {
                percentValue = parsedVal;
                colorCell = "red";
              }
            }
          }
          return (
            <>
              <p style={{ color: colorCell }}>{percentValue}</p>{" "}
            </>
          );
        },
      },
      {
        Header: "Display Time",
        accessor: "display_timestamp",
        Cell: ({ row }: any) => {
          let displayTime = row?.original?.display_timestamp;
          let myDate = new Date(displayTime);
          let newDate = myDate.toLocaleString();
          if (newDate === "Invalid Date") {
            newDate = "";
          }
          return (
            <>
              <p style={{ width: "190px" }}>{newDate}</p>
            </>
          );
        },
      },
    ],
    [apiData]
  );

  //Loading columns for percent
  const columnsNew = React.useMemo(
    () => [
      {
        Header: "Pairings",
        accessor: "display_symbol",
      },
      {
        Header: "Day Average",
        accessor: "averages.day",
        Cell: ({ row }: any) => {
          let avValue = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.averages.day) {
              avValue = parseFloat(row.original.averages.day).toFixed(3);
              avValue = avValue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          }
          return (
            <>
              <p>{avValue}</p>
            </>
          );
        },
      },
      {
        Header: "Weekly Average",
        accessor: "averages.week",
        Cell: ({ row }: any) => {
          let avValue = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.averages.week) {
              avValue = parseFloat(row.original.averages.week).toFixed(3);
              avValue = avValue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          }
          return (
            <>
              <p>{avValue}</p>
            </>
          );
        },
      },
      {
        Header: "Month Average",
        accessor: "averages.month",
        Cell: ({ row }: any) => {
          let avValue = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.averages.month) {
              avValue = parseFloat(row.original.averages.month).toFixed(3);
              avValue = avValue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          }
          return (
            <>
              <p>{avValue}</p>
            </>
          );
        },
      },
      {
        Header: "Hourly Change",
        accessor: "changes.percent.hour",
        Cell: ({ row }: any) => {
          let colorCell = "";
          let percentValue = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.changes.percent.hour) {
              let parsedVal = parseFloat(
                row.original.changes.percent.hour
              ).toFixed(3);
              parsedVal = parsedVal
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if (row.original.changes.percent.hour > 0) {
                percentValue = "+" + parsedVal + "%";
                colorCell = "green";
              } else {
                percentValue = parsedVal + "%";
                colorCell = "red";
              }
            }
          }
          return (
            <>
              <p style={{ color: colorCell }}>{percentValue}</p>
            </>
          );
        },
      },
      {
        Header: "Daily Change",
        accessor: "changes.percent.day",
        Cell: ({ row }: any) => {
          let colorCell = "";
          let percentValue = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.changes.percent.day) {
              let parsedVal = parseFloat(
                row.original.changes.percent.day
              ).toFixed(3);
              parsedVal = parsedVal
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if (row.original.changes.percent.day > 0) {
                percentValue = "+" + parsedVal + "%";
                colorCell = "green";
              } else {
                percentValue = parsedVal + "%";
                colorCell = "red";
              }
            }
          }
          return (
            <>
              <p style={{ color: colorCell }}>{percentValue}</p>
            </>
          );
        },
      },
      {
        Header: "Weekly Change",
        accessor: "changes.percent.week",
        Cell: ({ row }: any) => {
          let colorCell = "";
          let percentValue = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.changes.percent.week) {
              let parsedVal = parseFloat(
                row.original.changes.percent.week
              ).toFixed(3);
              parsedVal = parsedVal
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if (row.original.changes.percent.week > 0) {
                percentValue = "+" + parsedVal + "%";
                colorCell = "green";
              } else {
                percentValue = parsedVal + "%";
                colorCell = "red";
              }
            }
          }
          return (
            <>
              <p style={{ color: colorCell }}>{percentValue}</p>
            </>
          );
        },
      },
      {
        Header: "Monthly Change",
        accessor: "changes.percent.month",
        Cell: ({ row }: any) => {
          let colorCell = "";
          let percentValue = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.changes.percent.month) {
              let parsedVal = parseFloat(
                row.original.changes.percent.month
              ).toFixed(3);
              parsedVal = parsedVal
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if (row.original.changes.percent.month > 0) {
                percentValue = "+" + parsedVal + "%";
                colorCell = "green";
              } else {
                percentValue = parsedVal + "%";
                colorCell = "red";
              }
            }
          }
          return (
            <>
              <p style={{ color: colorCell }}>{percentValue}</p>
            </>
          );
        },
      },
      {
        Header: "Display Time",
        accessor: "display_timestamp",
        Cell: ({ row }: any) => {
          let displayTime = row.original.display_timestamp;
          let myDate = new Date(displayTime);
          let newDate = myDate.toLocaleString();
          return (
            <>
              <p style={{ width: "190px" }}>{newDate}</p>
            </>
          );
        },
      },
    ],
    [apiData]
  );

  // modifyApi data basis onchange selection
  const modifyApiData = (e: string) => {
    const removeCopies = displayData.filter((el: any) => {
      const duplicate = seen.has(el.display_symbol);
      seen.add(el.display_symbol);
      return !duplicate;
    });

    if (e === "all") {
      setApiData(removeCopies);
    } else {
      let modifiedData = removeCopies.filter((value: any) => {
        return (
          value.display_symbol.substring(value.display_symbol.length - 3) === e
        );
      });
      setApiData(modifiedData);
    }
  };

  // filterApidata data basis on type of request received
  const filterApiData = (e: string, arr: []) => {
    let modifiedData = arr.filter((value: any) => {
      console.log("arr", value, "gotSTring", e);
      return (
        value.display_symbol.substring(value.display_symbol.length - 3) ===
        e.slice(-3)
      );
    });
    const seen = new Set();
    const removeCopies = modifiedData.filter((el: any) => {
      const duplicate = seen.has(el.display_symbol);
      seen.add(el.display_symbol);
      return !duplicate;
    });
    setApiData(removeCopies);
  };

  // return default selected value
  const checkSelected = (e: string): boolean => {
    defaultSelected =
      cryptoValue.length > 4
        ? cryptoValue.substring(cryptoValue.length - 3)
        : "all";
        if (e === defaultSelected) {
          return true;
        }
        return false;
  };

  // View of the page
  return (
    <div>
      <h2 className="title">{title}</h2>
      {showFiat && (
        <div className="pairingFilter">
          <label className="label">Fiat Currency</label>

          <select
            className="selectClass"
            onChange={(e: any) => {
              modifyApiData(e.target.value);
            }}
          >
            <option value="all">All</option>
            {newCurrArr?.map((el) => (
              <option value={el} selected={checkSelected(el)}>
                {" "}
                {el}{" "}
              </option>
            ))}
          </select>

          <button
            className="selectClass selectHeight"
            onClick={(e) => {
              if (toggleValue === "Show in Price") {
                setToggleValue("Show in Percent");
                setChangeValue(true);
              } else {
                setToggleValue("Show in Price");
                setChangeValue(false);
              }
              const removeCopies = apiData.filter((el: any) => {
                const duplicate = seen.has(el.display_symbol);
                seen.add(el.display_symbol);
                return !duplicate;
              });
              setApiData(removeCopies);
            }}
          >
            {toggleValue}
          </button>
        </div>
      )}
      {changeValue && (
        <DataGrid data={apiData} columns={columns} tableGridCols={12} />
      )}
      {!changeValue && (
        <DataGrid data={apiData} columns={columnsNew} tableGridCols={12} />
      )}
    </div>
  );
};

export default Pairing;
