# Mondu Frontend challenge - Tanvi

Clone or download the code,
do npm install,
do npm start, http://localhost:3000/ will open. 
Detailed steps are mentioned in Test cases TanviFE Challenge sheet which is there in the repo.

There are two pages:

1) Dashboard - It displays all the data for all pairings. 
In the input, you can type in any crypto, lets say ETH and click suggestion/press enter key or submit your choice.
It gives autosuggestions, (input example: eth, ETH, ETH-CAD, ETHCAD). If you enter wrong input, it won't redirect you and you stay on Dashboard page only.

Note - I have made input autosuggestions from scratch, without using any npm/react autocomplete dependency.

2) On enter/click/submit, you will be redirected to Pairing page(example: localhost:300/ETH or localhost:300/ETHCAD) showing data based on your request.

example: localhost:300/ETH
Here ETH is displayed in its all available currencies. You can filter in Fiat Currency dropdown which currency you want to see data in.
You can also Toggle Change columns data between Percent or Price by clicking Show in Percent or Price respectively.

example: localhost:300/ETHCAD
It displays ETHCAD data with CAD autofiltered in Fiat Currency dropdown. But at the same time , you can select ETH values in different currencies from dropdown and the table data is updated accordingly.

Note - The data in both pages is displayed in form of a table. This is a generic table which I have made which can be reused.
The data is sortable in both the pages.

You can see colors basis positive negative change.The values are displayed till three decimal places.
In case of large number you will see number with comma.
For redirection, navigation, I have used Route
The Display time is visible in localTime (I converted from GMT to Local)

Dashboard getapi : Api.getData("/indices/local/ticker/all") ,
Pairing getapi : Api.getData("/indices/local/ticker/all?crypto=${newcryptoValue}")

