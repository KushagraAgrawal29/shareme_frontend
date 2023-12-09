import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, MasonryLayout } from ".";
import { searchQuery,feedQuery } from "../utilities/index";

import { client } from "../client";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      const query = feedQuery();
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner message="We are adding new ideas to your feed!" />;
  }

  return (
    <div>
        {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
};

export default Feed;
