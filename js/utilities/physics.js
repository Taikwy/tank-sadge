// bounding box collision detection - it compares PIXI.Rectangles
function rectsIntersect(a,b){
    var ab = a.getBounds();
    var bb = b.getBounds();
    return ab.x + ab.width/2 > bb.x - bb.width/2 && ab.x - ab.width/2 < bb.x + bb.width/2 && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

//Checks if two circles intersect
function circleIntersect(c1, c2){
    let dist = new Vector(c1.x, c1.y, c2.x, c2.y);
    if(dist.magnitude < c1.radius + c2.radius)
        return true;
    return false;
}

//Checks if the circle c intersects with the rectange r
function circleRectCollision(c, r){
    let o = new PIXI.Point(c.x, c.y);
    let rSides = findSides(r);
    if(pointInRect(o, r)){
        return true;
    }
    for(let rSide of rSides){
        if(lineCircleIntersect(rSide, c)){
            return true;
        }
    }
    return false;
}

//Returns whether a line intersects a circle
function lineCircleIntersect(line, circle){
    //Vector from beginning of line to circle origin
    let originVect = new Vector(line.x, line.y, circle.x, circle.y);
    let projection = originVect.projection(line);

    if(projection.magnitude <= line.magnitude){
        let dist = new Vector(circle.x, circle.y, projection.x2, projection.y2);
        if(dist.magnitude < circle.radius){
            return true;
        }
    }
    
    //Vector from other of the line to circle origin
    originVect = new Vector(line.x2, line.y2, circle.x, circle.y);
    projection = originVect.projection(line);

    if(projection.magnitude <= line.magnitude){
        let dist = new Vector(circle.x, circle.y, projection.x2, projection.y2);
        if(dist.magnitude < circle.radius){
            return true;
        }
    }

    return false;
}

//Checks if the point is inside a rectangle from the 4 sides, with first side being the right and going CCW
function pointInRect(point, rect){
    let sides = findSides(rect);
    for(let side of sides){
        //Normal vector of each side, with beginning endpoint at the first endpoint of the original vector
        let normal = side.findNormal();

        //The vector from the beginning of checked side to the checked point
        let pointVect = new Vector(side.x, side.y, point.x, point.y);
        let dotProduct = normal.dotProduct(pointVect);
        
        //If the dot product is less than 0, then the point lies outside of the current side and can't possible be in the rectange
        if(dotProduct < 0){
            continue;
        }
        else if(side == sides[3]){
            return true;
        }
    }
    return false;
}

function hasSeparatingAxis(a, b){
    let aSides = findSides(a);
    //console.log(aSides);
    let bVerts = findVertices(b);

    for(let aSide of aSides){
        //Normal vector of each side of rect A, with beginning endpoint at the first endpoint of the original vector
        let normal = aSide.findNormal();
        normal.normalize();
        for(let bVert of bVerts){
            //The vector from the beginning of checked side to the checked point
            let bVect = new Vector(aSide.x, aSide.y, bVert.x, bVert.y);
            bVect.normalize();
            let dotProduct = normal.dotProduct(bVect);
            
            //If the dot product is greater than equal to 0, then the current point is not outside the rectangle's bounds
            //Break the current loop and proceed to check the next side
            if(dotProduct > 0){
                // console.log("broke");
                // console.log("-------------------------------");
                // console.log(findVertices(a));
                // console.log(findVertices(b));
                // console.log("side " + aSides.indexOf(aSide));
                // console.log(aSide);
                // console.log(normal);
                // console.log(bVect);
                // console.log("dot " + dotProduct);
                // console.log(bVerts.indexOf(bVert) + " " + bVert.x + " " + bVert.y);
                break;
            }

            if(bVert == bVerts[3]){
                // console.log("-------------------------------");
                // console.log(findVertices(a));
                // console.log("side " + aSides.indexOf(aSide));
                // console.log(aSide);
                // console.log(normal);
                // console.log(bVect);
                // console.log("dot " + dotProduct);
                // console.log(bVerts.indexOf(bVert) + " " + bVert.x + " " + bVert.y);
                // console.log("bruh-------------");
                return true;
            }
        }
    }

    let bSides = findSides(b);
    //console.log(aSides);
    let aVerts = findVertices(a);

    for(let bSide of bSides){
        //Normal vector of each side of rect A, with beginning endpoint at the first endpoint of the original vector
        normal = bSide.findNormal();
        normal.normalize();
        for(let aVert of aVerts){
            //The vector from the beginning of checked side to the checked point
            let aVect = new Vector(bSide.x, bSide.y, aVert.x, aVert.y);
            aVect.normalize();
            dotProduct = normal.dotProduct(aVect);
            
            if(dotProduct >= 0){
                break;
            }
            if(aVert.x == aVerts[3].x){
                return true;
            }
        }
    }
    //console.log("none$$$$$$");
    return false;
}

function hasSeparatingAxisTest(a, b){
    let aSides = findSides(a);
    //console.log(aSides);
    let bVerts = findVertices(b);

    for(let aSide of aSides){
        //Normal vector of each side of rect A, with beginning endpoint at the first endpoint of the original vector
        let normal = aSide.findNormal();
        normal.normalize();
        for(let bVert of bVerts){
            //The vector from the beginning of checked side to the checked point
            let bVect = new Vector(aSide.x, aSide.y, bVert.x, bVert.y);
            bVect.normalize();
            let dotProduct = normal.dotProduct(bVect);
            
            //If the dot product is greater than equal to 0, then the current point is not outside the rectangle's bounds
            //Break the current loop and proceed to check the next side
            if(dotProduct > 0){
                // console.log("broke");
                // console.log("-------------------------------");
                // console.log(findVertices(a));
                // console.log(findVertices(b));
                // console.log("side " + aSides.indexOf(aSide));
                // console.log(aSide);
                // console.log(normal);
                // console.log(bVect);
                // console.log("dot " + dotProduct);
                // console.log(bVerts.indexOf(bVert) + " " + bVert.x + " " + bVert.y);
                break;
            }

            if(bVert == bVerts[3]){
                // console.log("-------------------------------");
                // console.log(findVertices(a));
                // console.log("side " + aSides.indexOf(aSide));
                // console.log(aSide);
                // console.log(normal);
                // console.log(bVect);
                // console.log("dot " + dotProduct);
                // console.log(bVerts.indexOf(bVert) + " " + bVert.x + " " + bVert.y);
                // console.log("bruh-------------");
                return true;
            }
        }
    }

    let bSides = findSides(b);
    //console.log(aSides);
    let aVerts = findVertices(a);

    for(let bSide of bSides){
        //Normal vector of each side of rect A, with beginning endpoint at the first endpoint of the original vector
        normal = bSide.findNormal();
        normal.normalize();
        for(let aVert of aVerts){
            //The vector from the beginning of checked side to the checked point
            let aVect = new Vector(bSide.x, bSide.y, aVert.x, aVert.y);
            aVect.normalize();
            dotProduct = normal.dotProduct(aVect);
            
            if(dotProduct > 0){
                break;
            }
            if(aVert == aVerts[3]){
                //console.log("not");
                return true;
            }
        }
    }
    //console.log("none$$$$$$");
    return false;
}

function findSides(rect){
    let vertices = findVertices(rect);

    let side1 = new Vector(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y );
    let side2 = new Vector(vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y );
    let side3 = new Vector(vertices[2].x, vertices[2].y, vertices[3].x, vertices[3].y );
    let side4 = new Vector(vertices[3].x, vertices[3].y, vertices[0].x, vertices[0].y );

    let sides = [side1, side2, side3, side4];
    return sides;
}

//Returns 4 vertices of given rectangle, starting from bottom left and going clockwise
function findVertices(rect){
    let xMin, xMax, yMin, yMax;
    let vert1, vert2, vert3, vert4;
    let rotation = rect.rotation;

    xMin = rect.x + rect.width/2;
    xMax = rect.x - rect.width/2;
    yMin = rect.y + rect.height/2;
    yMax = rect.y - rect.height/2;

    //bottom left
    vert1 = new PIXI.Point(xMin, yMin);
    //top left
    vert2 = new PIXI.Point(xMin, yMax);
    //top right
    vert3 = new PIXI.Point(xMax, yMax);
    //bottom right
    vert4 = new PIXI.Point(xMax, yMin);

    let vertices = [vert1, vert2, vert3, vert4];
    for(let vert of vertices){
        let newX = (vert.x - rect.x) * Math.cos(rotation) - (vert.y - rect.y) * Math.sin(rotation) + rect.x;
        let newY = (vert.x - rect.x) * Math.sin(rotation) + (vert.y - rect.y) * Math.cos(rotation) + rect.y;
        vert.x = newX;
        vert.y = newY;
    }

    return vertices;
}

function handleCollisions(a, b){
    if (a.collision == 0){
        if(b.collision == 0){
            if(circleIntersect(a, b))
                return true;
            else
                return false;
        }
        else if(b.collision == 1){
            circleRect(a, b);
        }
    }
    else if(a.collision == 1){
        if(b.collision == 1){
            if(rectColl(a, b))
                return true;
        }
        else if(b.collision == 0){
            if(circleRect(b, a))
                return true;
        }
    }
    return false;
}

function circleRect(c, r){

}

function rectColl(a, b){
    if (!hasSeparatingAxisTest(a, b)) {
        let aHalfWidth = a.width/2;
        let aHalfHeight = a.height/2;
        let bHalfWidth = b.width/2;
        let bHalfHeight = b.height/2;
        let combinedHalfWidths = aHalfWidth + bHalfWidth;
        let combinedHalfHeights = aHalfHeight + bHalfHeight;

        let xDist = Math.abs(a.x - b.x);
        let yDist = Math.abs(a.y - b.y);

        //Distance of x and y values of origin is within half
        let xOverlap = combinedHalfWidths - xDist;
        let yOverlap = combinedHalfHeights - yDist;

        //x collision
        if(yOverlap >= xOverlap){
            //Going towards left
            if(a.x > b.x){
                a.x = b.x + combinedHalfWidths;
            }
            //Going towards right
            else{
                a.x = b.x - combinedHalfWidths;
            }
        }
        //y collision
        else{
            //Going towards top
            if(a.y > b.y){
                a.y = b.y + combinedHalfHeights;
            }
            //Going towards bottom
            else{
                a.y = b.y - combinedHalfHeights;
            }
        }

        return true;
    }
    return false;
}

//Uses bounding box to keep kinetic objects from intersecting static ones
function AABBCollisions(a, b) {
    if (!hasSeparatingAxis(a, b)) {
        //X coord collision
        if (Math.abs(a.x - b.x) > Math.abs(a.y - b.y) ) {
            if (a.x < b.x+b.width/2) {
                a.x = b.x -  (b.width / 2+a.width/2);
            }
            else if (a.x > b.x-b.width/2) {
                a.x = b.x + (b.width/2 + a.width / 2);
            }
            else if (a.y < b.y-b.height/2) {
                a.y = b.y - (b.height/2 + a.height/2);
            }
            else if (a.y > b.y+b.height/2) {
                a.y = b.y + (b.height/2 + a.height / 2);
            }
        }
        //Y coord collision
        else {
            if (a.y < b.y-b.height/2) {
                a.y = b.y - (b.height/2 + a.height/2);
            }
            else if (a.y > b.y+b.height/2) {
                a.y = b.y + (b.height/2 + a.height / 2);
            }
            else if (a.x < b.x-b.width/2) {
                a.x = b.x -  (b.width / 2+a.width/2);
            }
            else if (a.x > b.x+b.width/2) {
                a.x = b.x + (b.width/2 + a.width / 2);
            }
        }
        return true;
    }
    return false;
}

//a is bullet, b is the tile
function bulletColl(a, b){
    if (!hasSeparatingAxisTest(a, b) && b.passable == false) {
        //console.log(b.passable);
        let bHalfWidth = b.width/2;
        let bHalfHeight = b.height/2;

        let xDist = Math.abs(a.x - b.x);
        let yDist = Math.abs(a.y - b.y);

        let maxXOverlap = 0;
        let maxYOverlap = 0;

        let overlappingPoints = [];

        for(let vertex of findVertices(a)){
            if(pointInRect(vertex, b)){
                overlappingPoints.push(vertex);
            }
        }
        for(let overlappingPoint of overlappingPoints){
            //xdist of A plus bhlafwidth
            let combinedWidths = Math.abs(overlappingPoint.x - a.x) + bHalfWidth;
            let combinedHeights = Math.abs(overlappingPoint.y - a.y) + bHalfHeight;
            let xOverlap = combinedWidths - xDist;
            let yOverlap = combinedHeights - yDist;

            if(xOverlap > maxXOverlap)
                maxXOverlap = xOverlap;
            if(yOverlap > maxYOverlap)
                maxYOverlap = yOverlap;
        }
        let maxXDist = maxXOverlap + xDist;
        let maxYDist = maxYOverlap + yDist;

        //x collision
        if(maxYOverlap >= maxXOverlap){
            //Going towards left
            if(a.x > b.x){
                a.x = b.x + maxXDist;
            }
            //Going towards right
            else{
                a.x = b.x - maxXDist;
            }
            // if(!hasSeparatingAxisTest(a, b))
            //     console.log("bruh");
            a.reflectX();
        }
        //y collision
        else{
            //Going towards top
            if(a.y > b.y){
                a.y = b.y + maxYDist;
            }
            //Going towards bottom
            else{
                a.y = b.y - maxYDist;
            }
            a.reflectY();
        }
        return true;
    }
    return false;
}

//Uses bounding box to reflect bullets when they hit walls
function bulletCollisions(a, b) {
    if (!hasSeparatingAxis(a, b)) {
        if (Math.abs(a.x - b.x) > Math.abs(a.y - b.y) ) {
            a.reflectX();
        }
        //Y coord collision
        else {
            a.reflectY();
        }
        return true;
    }
    return false;
}

//Uses bounding box to change enemy directions when they hit walls
function tankCollisions(a, b) {
    if (rectsIntersect(a, b)) {
        if (Math.abs(a.x - b.x) > Math.abs(a.y - b.y)) {
            a.reflectX();
        }
        //Y coord collision
        else {
            a.reflectY();
        }
        return true;
    }
    return false;
}