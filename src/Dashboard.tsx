import React, { Fragment, useEffect, useState } from "react";
import DataGrid from "./DataGrid";
import Api from "./utils/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [apiData, setApiData] = useState([{}]);
  let cryptoArray: any = [];
  const [textValue, setTextValue] = useState("");
  const navigate = useNavigate();
  const [newCryptoArr, setNewCryptoArr] = useState([]);
  let title = "Welcome to Dashboard";
  const [suggestion, setSuggestion] = useState([]);
  const [moreMatches, setMoreMatches] = useState([]);

  // Call the get api to receive data for dashboard
  useEffect(() => {
    async function getData() {
      try {
        await Api.getData("/indices/local/ticker/all").then((res) => {
          let arr = res.data;
          const keys = Object.values(arr);
          let newArr: any = [];
          keys.forEach((x: any) => {
            newArr.push(x);
            x.display_symbol.length > 7
              ? cryptoArray.push(x.display_symbol.substring(0, 4))
              : cryptoArray.push(x.display_symbol.substring(0, 3));
            cryptoArray.push(x.display_symbol);
          });
          cryptoArray = removeDuplicates(cryptoArray);
          setNewCryptoArr(cryptoArray);
          setApiData(newArr);
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

  // remove duplicate values from array
  const removeDuplicates = (arr: any) => {
    return arr.filter((item: any, index: any) => arr.indexOf(item) === index);
  };

  // Load Dashboard Columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Pairings",
        accessor: "display_symbol",
      },
      {
        Header: "Ask",
        accessor: "ask",
        Cell: ({ row }: any) => {
          let askValue = "";
          if (Object.keys(row.original).length !== 0) {
            if (row.original.ask) {
              askValue = parseFloat(row.original.ask).toFixed(3);
              askValue = askValue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          }
          return (
            <>
              <p>{askValue}</p>
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
    ],
    [apiData]
  );

  // on click of suggestion
  const onSuggestHandler = (text: any) => {
    setTextValue(text.toUpperCase());
    setSuggestion([]);
    setMoreMatches([]);
    let value = text.toUpperCase();
    if (value) {
      if (value.includes("-")) {
        const routeURL = `/${value.split("-").join("")}`;
        navigate(routeURL);
      } else {
        const routeURL = `/${value}`;
        navigate(routeURL);
      }
    }
  };

  // on change of input value
  const onChangeHandler = (text: any) => {
    let matches: any = [];
    if (text.length > 0 && !text.includes("-")) {
      matches = newCryptoArr.filter((x: any) => {
        //remove hyphen from x
        x = x.includes("-") ? x.split("-").join("") : x;
        const regex = new RegExp(`${text.toUpperCase()}`);
        return x.match(regex);
      });
    } else if (text.length > 0) {
      matches = newCryptoArr.filter((x: any) => {
        const regex = new RegExp(`${text.toUpperCase()}`);
        return x.match(regex);
      });
    }
    setMoreMatches(matches);
    console.log("matches", matches);
    setSuggestion(matches);
    setTextValue(text.toUpperCase());
  };

  // View of Dashboard

  return (
    <div className="dashboardDiv">
      <h2 className="title">{title}</h2>

      <input
        className="col-md-12 input"
        type="text"
        style={{ marginTop: 10 }}
        value={textValue}
        placeholder="Enter crypto like ETH"
        onChange={(e) => {
          onChangeHandler(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            let value = (e.target as HTMLInputElement).value;
            moreMatches.map((val: any) => {
              val = val.includes("-") ? val.split("-").join("") : val;
              value = value.includes("-") ? value.split("-").join("") : value;
              if (value && val === value) {
                console.log("macthes", value);
                const routeURL = `/${value}`;
                navigate(routeURL);
                //}
              }
            });
          }
        }}
      ></input>
      <button
        className="selectClass selectHeight"
        onClick={(e) => {
          if (textValue) {
            moreMatches.map((val: any) => {
              val = val.includes("-") ? val.split("-").join("") : val;
              let newtextValue = textValue.includes("-")
                ? textValue.split("-").join("")
                : textValue;
              if (newtextValue && val === newtextValue) {
                console.log("macthes", newtextValue);
                const routeURL = `/${newtextValue}`;
                navigate(routeURL);
              }
            });
          }
        }}
      >
        Submit
      </button>
      <div className="suggestions">
        {suggestion &&
          suggestion.map((suggestion, i) => (
            <div
              className="suggDiv"
              key={i}
              onClick={(e) => {
                onSuggestHandler(suggestion);
              }}
            >
              {suggestion}
            </div>
          ))}
      </div>

      <DataGrid data={apiData} columns={columns} tableGridCols={12} />
    </div>
  );
};

export default Dashboard;
