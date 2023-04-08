import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import {useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store'; 
import { addToHistory } from '@/lib/userData';

export default function AdvancedSearch() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const router = useRouter()
    const { register, handleSubmit, setValue, watch  } = useForm({
        defaultValues: {
            searchBy: "",
            geolocation: "",
            medium: "",
            isOnView: false,
            isHighlight: false,
            q: ""
        }
    });
    const watchAllFields = watch(); 
    useEffect(() => {
        let data = {
            searchBy: "title",
            geolocation: "",
            medium: "",
            isOnView: false,
            isHighlight: false,
            q: ""
        }
    
        for (const prop in data) {
          setValue(prop, data[prop]);
        }
    }, [])
    
    
        
    async function submitForm(data) {
        let queryString = ""
        queryString += `${data.searchBy}=true`
        if (data.geolocation != null && data.geolocation != undefined && data.geolocation != ""){
            queryString += `&geoLocation=${data.geolocation}`
        }
        if (data.medium != null && data.medium != undefined && data.medium != ""){
            queryString += `&medium=${data.medium}`
        }
        queryString += `&isOnView=${data.isOnView}`
        queryString += `&isHighlight=${data.isHighlight}`
        queryString += `&q=${data.q}`
        let querysearch = `artwork?${queryString}`
        // setSearchHistory(current => [...current, querysearch]);
        setSearchHistory(await addToHistory(querysearch))
        router.push(querysearch)
    }
    return (
      <>
        <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control type="text" placeholder="" name="q" {...register("q")} />
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                <Form.Label>Search By</Form.Label>
                <Form.Select name="searchBy" className="mb-3" {...register("searchBy")}>
                    <option value="title">Title</option>
                    <option value="tags">Tags</option>
                    <option value="artistOrCulture">Artist or Culture</option>
                </Form.Select>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Geo Location</Form.Label>
                    <Form.Control type="text" placeholder="" name="geoLocation" {...register("geolocation")}/>
                    <Form.Text className="text-muted">
                    Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Medium</Form.Label>
                    <Form.Control type="text" placeholder="" name="medium" {...register("medium")}/>
                    <Form.Text className="text-muted">
                    Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Check
                    type="checkbox"
                    label="Highlighted"
                    name="isHighlight"
                    {...register("isHighlight")}
                />
                <Form.Check
                    type="checkbox"
                    label="Currently on View"
                    name="isOnView"
                    {...register("isOnView")}
                />
                </Col>
            </Row>
            <Row>
                <Col>
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Col>
            </Row>
        </Form>
      </>
    )
  }
  