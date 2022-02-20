import {
  AppBar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const Search = () => {
  const [theme, setTheme] = useState("");
  const [videos, setVideos] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getVideos = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const handleSubmit = (e) => {
    setVideos("");
    setIsLoading(true);
    e.preventDefault();
    setTheme(theme.toLowerCase());
    if (theme) {
      getVideos(`http://localhost:3001/videos/${theme}`).then((data) => {
        data.videoDetails.forEach((element) => {
          console.log(element);
        });
        setVideos(data);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            MiniYoutube
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          marginTop: 7,
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter the theme"
            id="fullWidth"
            name="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
      <Container sx={{ marginTop: 6 }}>
        <Grid container spacing={4}>
          {isLoading && (
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Fetching Data (May Take few seconds)...
              </Typography>
            </Grid>
          )}
          {videos === "" || videos.videoDetails.length > 0 || (
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Please enter a valid theme...
              </Typography>
            </Grid>
          )}
          {videos === "" ||
            videos.videoDetails.map((element) => {
              return (
                <Grid item xs={6} key={element.videoId}>
                  <Card elevation={6}>
                    <CardContent>
                      <Typography variant="body2" align="left">
                        {element.title}
                      </Typography>
                      <Typography variant="body2" align="left">
                        Channel Name: {element.channelTitle}
                      </Typography>
                      <Typography variant="body2" align="left">
                        Published On:{" "}
                        {new Date(element.publishedAt).toUTCString()}
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="iframe"
                      width={200}
                      height={324}
                      image={`https://www.youtube.com/embed/${element.videoId}`}
                    />
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};

export default Search;
