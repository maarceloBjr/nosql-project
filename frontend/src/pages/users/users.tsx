import { useEffect } from "react";
import List from "@/components/List";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
} from "./store/reducers";
import { RootState } from "@/redux/store";

export const Users: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUsersRequest());
      try {
        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();
        dispatch(fetchUsersSuccess(data));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(fetchUsersFailure(err.message));
        } else {
          dispatch(fetchUsersFailure("An unknown error occurred"));
        }
      }
    };

    fetchUsers();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-screen flex items-center justify-center p-5">
      <div className="h-3/4 w-full overflow-hidden">
        <List users={users} />
      </div>
    </div>
  );
};
