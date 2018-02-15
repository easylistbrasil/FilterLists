import * as React from "react";
import { RouteComponentProps } from "react-router";
import "isomorphic-fetch";
import ReactTable from "react-table"
import "react-table/react-table.css"

interface IFilterListsState {
    filterLists: IFilterList[];
    loading: boolean;
}

export class Home extends React.Component<RouteComponentProps<{}>, IFilterListsState> {
    constructor(props: any) {
        super(props);
        this.state = { filterLists: [], loading: true };

        fetch("https://api.filterlists.com/v1/lists")
            .then(response => response.json() as Promise<IFilterList[]>)
            .then(data => {
                this.setState({ filterLists: data, loading: false });
            });
    }

    render() {
        const contents = this.state.loading
            ? <p>
                  <em>Loading...</em>
              </p>
            : Home.renderFilterListsTable(this.state.filterLists);

        return <div>
                   {contents}
               </div>;
    }

    private static renderFilterListsTable(filterLists: IFilterList[]) {
        return <ReactTable
                   data={filterLists}
                   columns={[
                       {
                           Header: "Name",
                           accessor: "name",
                           maxWidth: 250
                       },
                       {
                           Header: "Description",
                           accessor: "description",
                           className: "hidden-xs",
                           headerClassName: "hidden-xs"
                       },
                       {
                           Header: "View",
                           accessor: "viewUrl",
                           Cell: (d: any) => <a href={d.value}>View</a>,
                           maxWidth: 100
                       },
                       {
                           Header: "Subscribe",
                           accessor: "viewUrl",
                           Cell: (d: any) => <a href={`abp:subscribe?location=${encodeURIComponent(d.value)
                               }&amp;title=${encodeURIComponent(d.row.name)}`}>Subscribe</a>,
                           maxWidth: 100
                       }
                   ]}
                   SubComponent={(row: any) => {
                       return (
                           <div style={{ padding: "20px" }}>
                               <em>
                                   {row.original.description}
                               </em>
                           </div>
                       );
                   }}/>;
    }
}

interface IFilterList {
    id: number;
    name: string;
    description: string;
    viewUrl: string;
}