"use client";

import { useGetUsersQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 200 },
  { field: "name", headerName: "User Name", width: 200 },
  { field: "email", headerName : "Email", width : 200
  },
];

const User = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch users
      </div>
    );
  }

  return (
    <div className="flex flex-col ">
      <Header name="Users" />
      <DataGrid
      className="ml-2"
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
        sx={{
            '& .even': {
              backgroundColor: '#DDE6ED',
              '&:hover': {
                backgroundColor: "#FAF1E6",
            },
    
            },
            '& .odd': {
              backgroundColor: '#E8F9FF',
            },
            '& .MuiDataGrid-columnHeaders': { 
      color: '#3D365C',
      fontWeight: 'bold',
    },
            borderRadius: 2,
            boxShadow: 3,
            marginTop : 2,
          }}
      />
    </div>
  );
};

export default User;