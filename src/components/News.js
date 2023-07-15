import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";





const News =(props)=> {
    
const[articles,setArticles]=useState([])
const[loading,setLoading]=useState(true)
const[page,setPage]=useState(1)

const[totalResults,setTotalResults]=useState(0)

  
  const updateNews= async ()=> {
          
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey} &page=${page}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
    
        setLoading(true);
      
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        // console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        props.setProgress(100);
    }

    useEffect(()=>{
        updateNews();
        //eslint-disable-next-line
        },[])
    
    

    // async componentDidMount() {

    //     this.updateNews();
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f326020d3f14b309d5f713c7f589293&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
    //}
//    const handlePreviousClick = async () => {
        

//         // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f326020d3f14b309d5f713c7f589293&page=${this.state.page - 1} &pageSize=${this.props.pageSize}`;
//         // this.setState({ loading: true });

//         // let data = await fetch(url);
//         // let parsedData = await data.json()
//         // console.log(parsedData);


//         // this.setState({

//         //     page: this.state.page - 1,
//         //     articles: parsedData.articles,
//         //     loading: false
//         //});

//         // this.setState({ page: this.state.page - 1 });
//         setPage(page-1)
//         updateNews();
//     }
    // const handleNextClick = async () => {
        
    //     // if (!this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    //     // }

    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f326020d3f14b309d5f713c7f589293&page=${this.state.page + 1} &pageSize=${this.props.pageSize}`;
    //     // this.setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()



    //     // this.setState({

    //     //     page: this.state.page + 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // });
    //     // this.setState({ page: this.state.page + 1 });
    //     setPage(page+1)
    //     updateNews();
    // }

    const fetchMoreData = async() => {
        // this.setState({page:this.state.page+1})
       
       
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
       
        setPage(page+1)
        // this.setState({ loading: true });
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // this.setState({
        //     articles: articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        
    };
     
    
        return (
            <>
            {/* // <div className="container my-2"> */}
                <h1 className="text-center">NewsApp -Top HeadLines</h1>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!==totalResults}
                    loader={<Spinner /> }>
                    <div className="container">
                       
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 88) : " "}
                                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
                </>
                /* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */

           
        )
                    
}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
