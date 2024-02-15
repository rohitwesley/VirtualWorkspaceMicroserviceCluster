import numpy as np

##############################################################
### Mesh management and traversal helpers
##############################################################

def next_side(fs):
    """
    For a given side s of a triangle, returns the next side t. (This method serves mainly to make code more readable.)

    :param fs: A face side (f,s)
    :returns: The next face side in the same triangle (f, sn)
    """
    raise ValueError("not yet implemented") 


def other(G, fs):
    """
    For a given face-side fs, returns the neighboring face-side in some other triangle.

    :param G: |F|x3x2 gluing map G,
    :param fs: a face-side (f,s)
    :returns: The neighboring face-side (f_opp,s_opp)
    """
    raise ValueError("not yet implemented") 

def n_faces(F):
    """
    Return the number of faces in the triangulation.

    :param F: |F|x3 array of face-vertex indices
    :returns: |F|
    """
    return F.shape[0]

def n_verts(F):
    """
    Return the number of vertices in the triangulation.

    Note that for simplicity this function recovers the number of vertices from
    the face listing only. As a consequence it is _not_ constant-time, and
    should not be called in a tight loop.

    :param F: |F|x3 array of face-vertex indices
    :returns: |F|
    """
    return np.amax(F)+1


##############################################################
### Geometric subroutines
##############################################################

def face_area(l, f):
    """
    Computes the area of the face f from edge lengths

    :param l: |F|x3 array of face-side edge lengths
    :param f: An integer index specifying the face
    :returns: The area of the face.
    """
    raise ValueError("not yet implemented") 

def surface_area(F,l):
    """
    Compute the surface area of a triangulation.

    :param F: A |F|x3 vertex-face adjacency list F
    :param l: F |F|x3 edge-lengths array, giving the length of each face-side
    :returns: The surface area
    """
    raise ValueError("not yet implemented") 

def opposite_corner_angle(l, fs):
    """
    Computes triangle corner angle opposite the face-side fs.

    :param l: A |F|x3 array of face-side edge lengths
    :param fs: An face-side (f,s)
    :returns: The corner angle, in radians
    """
    raise ValueError("not yet implemented") 


def diagonal_length(G, l, fs):
    """
    Computes the length of the opposite diagonal of the diamond formed by the
    triangle containing fs, and the neighboring triangle adjacent to fs.

    This is the new edge length needed when flipping the edge fs.

    :param G: |F|x3x2 gluing map
    :param l: |F|x3 array of face-side edge lengths
    :param fs: A face-side (f,s)
    :returns: The diagonal length
    """
    raise ValueError("not yet implemented") 


def is_delaunay(G, l, fs):
    """
    Test if the edge given by face-side fs satisfies the intrinsic Delaunay property.

    :param G: |F|x3x2 gluing map G,
    :param l: |F|x3 array of face-side edge lengths
    :param fs: A face-side (f,s)
    :returns: True if the edge is Delaunay
    """
    raise ValueError("not yet implemented") 


##############################################################
### Construct initial data
##############################################################


def build_edge_lengths(V,F):
    """
    Compute edge lengths for the triangulation.

    Note that we store a length per face-side, which means that each edge
    length appears twice. This is just to make our code simpler.

    :param V: |V|x3 array of vertex positions
    :param F: |F|x3 array of face-vertex indices
    :returns: The |F|x3 array of face-side lengths
    """
    raise ValueError("not yet implemented") 


def sort_rows(A):
    """
    Sorts rows lexicographically, i.e., comparing the first column first, then using subsequent columns to break ties.

    :param A: A 2D array
    :returns: A sorted array with the same dimensions as A
    """
    return A[np.lexsort(np.rot90(A))]


def glue_together(G, fs1, fs2):
    """
    Glues together the two specified face sides.  Using this routine (rather
    than manipulating G directly) just helps to ensure that a basic invariant
    of G is always preserved: if a is glued to b, then b is glued to a.

    The gluing map G is updated in-place.

    :param G: |F|x3x2 gluing map
    :param fs1: a face-side (f1,s1)
    :param fs2: another face-side (f2,s2)
    """
    raise ValueError("not yet implemented") 


def build_gluing_map(F):
    """
    Builds the gluing map for a triangle mesh.

    :param F: |F|x3 vertex-face adjacency list F describing a manifold, oriented triangle mesh without boundary.
    :returns: |F|x3x2 gluing map G, which for each side of each face stores the
    face-side it is glued to.  In particular, G[f,s] is a pair (f',s') such
    that (f,s) and (f',s') are glued together.
    """
    raise ValueError("not yet implemented") 


def validate_gluing_map(G):
    """
    Performs sanity checks on the connectivity of the gluing map. Throws an
    exception if anything is wrong.

    :param G: |F|x3x2 gluing map G
    """

    for f in range(n_faces(G)):
        for s in range(3):

            fs = (f,s)
            fs_other = other(G, fs)

            if fs == fs_other:
                raise ValueError("gluing map points face-side to itself {}".format(fs))

            if fs != other(G, fs_other):
                raise ValueError("gluing map is not involution (applying it twice does not return the original face-side) {} -- {} -- {}".format(fs, fs_other, other(G, fs_other)))



##############################################################
### Intrinsic Delaunay and edge flipping
##############################################################

def flip_edge(F, G, l, s0):
    """
    Performs an intrinsic edge flip on the edge given by face-side s0. The
    arrays F, G, and l are updated in-place.

    This routine _does not_ check if the edge is flippable. Conveniently, in
    the particular case of flipping to Delaunay, non-Delaunay edges can always
    be flipped.

    :param F: |F|x3 vertex-face adjacency list F
    :param G: |F|x3x2 gluing map G
    :param l: |F|x3 edge-lengths array, giving the length of each face-side
    :param s0: A face-side of the edge that we want to flip

    :returns: The new identity of the side fs_a
    """
    raise ValueError("not yet implemented") 


def flip_to_delaunay(F, G, l):
    """
    Flip edges in the triangulation until it satisifes the intrinsic Delaunay criterion.

    For simplicity, we will implement this algorithm in terms of face-sides, checking if
    each face-side satisifes the criterion. Technically, this means we are testing each
    edge twice, which is unecessary, but makes our implementation simpler.

    The arrays F,G,l are modified in-place.

    :param F: |F|x3 vertex-face adjacency list F
    :param G: |F|x3x2 gluing map G
    :param l: |F|x3 edge-lengths array, giving the length of each face-side
    """
    raise ValueError("not yet implemented") 

def check_delaunay(F,G,l):
    """
    Check if a triangulation satisifies the intrinsic Delaunay property.

    :param F: |F|x3 vertex-face adjacency list F
    :param G: |F|x3x2 gluing map G
    :param l: |F|x3 edge-lengths array, giving the length of each face-side
    :returns: True if the triangulation is intrinsic Delaunay.
    """
    for f in range(n_faces(F)):
        for s in range(3):
            if not is_delaunay(G,l,(f,s)):
                return False
    return True

def print_info(F,G,l):
    """
    Print some info about a mesh

    :param F: |F|x3 vertex-face adjacency list F
    :param G: |F|x3x2 gluing map G
    :param l: |F|x3 edge-lengths array, giving the length of each face-side
    """

    print("  n_verts = {}".format(n_verts(F)))
    print("  n_faces = {}".format(n_faces(F)))
    print("  surface area = {}".format(surface_area(F,l)))
    print("  is Delaunay = {}".format(check_delaunay(F,G,l)))

##############################################################
### Run the code: flip to intrinsic Delaunay
##############################################################

# Some test data: a simple shape with 5 vertices
V = np.array([ [0, 5., 0], [0, 1, -3.], [-4., 0, 0], [0, 1, 3.], [4., 0, 0] ])
F = np.array([ [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1], [1, 4, 2], [2, 4, 3] ])
source_vert = 0

# Use these lines to load any triangle mesh you would like.
# .obj, .ply, and .off formats are supported
# (install with python -m pip install potpourri3d)
# import potpourri3d as pp3d

# uncomment these lines to run on the meshes included with the tutorial
# (note that they additionally set a good source vertex for the later example)
# (V, F), source_vert = pp3d.read_mesh("example_data/terrain8k.obj"), 2894
# (V, F), source_vert = pp3d.read_mesh("example_data/pegasus.obj"), 1669
# (V, F), source_vert = pp3d.read_mesh("example_data/rocketship.ply"), 26403

# use this line to run on your own mesh of interest
# V, F = pp3d.read_mesh("path/to/your/mesh.obj")

# initialize the glue map and edge lengths arrays from the input data
G = build_gluing_map(F)
l = build_edge_lengths(V,F)

print("Initial mesh:")
print_info(F,G,l)

# make a copy (so we preserve the original mesh), and flip to Delaunay
F_delaunay= F.copy()
G_delaunay = G.copy()
l_delaunay = l.copy()
flip_to_delaunay(F_delaunay, G_delaunay, l_delaunay)

print("After Delaunay flips:")
print_info(F_delaunay,G_delaunay,l_delaunay)




##############################################################
### Example application: Heat Method for Distance
##############################################################

# This section contains a simple self-contained implementation of the Heat
# Method, a PDE-based method to compute geodesic distance along a surface from
# a specified source point.

# For reference, see "The Heat Method for Distance Computation", by Crane,
# Weischedel, Wardetzky (2017).

# This algorithm makes use of the Laplace matrix, and we will see that applying
# the Delaunay edge flipping routine from above automatically improves results on
# low-quality triangulations.

# we will use Scipy for sparse matrix operations
import scipy
import scipy.sparse
import scipy.sparse.linalg

def build_cotan_laplacian(F,l):
    """
    Build the cotan-Laplace matrix for a triangulation.

    :param F: |F|x3 vertex-face adjacency list F
    :param l: |F|x3 edge-lengths array, giving the length of each face-side
    :returns: The Laplace matrix, as a sparse, |V|x|V| real scipy matrix 
    """
    raise ValueError("not yet implemented") 

def build_lumped_mass(F,l):
    """
    Build the lumped mass matrix for a triangulation, which associates an area with each vertex.

    :param F: |F|x3 vertex-face adjacency list F
    :param l: |F|x3 edge-lengths array, giving the length of each face-side
    :returns: The mass matrix, as a sparse, |V|x|V| real scipy matrix (which
    happens to be a diagonal matrix)
    """
    raise ValueError("not yet implemented") 


def edge_in_face_basis(l, fs):
    """
    We associate a 2D-coordinate system with each face in a triangulation.
    Given a face-side, this routine returns the vector of the corresponding
    edge in that face.

    :param l: |F|x3 edge-lengths array, giving the length of each face-side
    :returns: The edge vector, as little length-2 numpy array
    """
    raise ValueError("not yet implemented") 

def evaluate_gradient_at_faces(F,l,x):
    """
    Given a scalar function at vertices, compute its gradient in each face.
    The gradients are defined in a tangent-coordinate system in each face as
    specified by edge_in_face_basis().

    :param F: |F|x3 vertex-face adjacency list F
    :param l: |F|x3 edge-lengths array, giving the length of each face-side
    :param x: A scalar function as a length-|V| numpy array, holding one value per vertex
    :returns: |F|x2 array of gradient vectors per-face (defined in the local 2D basis for each face)
    """
    raise ValueError("not yet implemented") 

def evaluate_divergence_at_vertices(F,l,v):
    """
    Given a vector field defined by a collection of gradient vectors at the
    faces of a triangulation, evaluate the divergence of the vector field as
    a scalar value at vertices.

    :param F: |F|x3 vertex-face adjacency list F
    :param l: |F|x3 edge-lengths array, giving the length of each face-side
    :param v: |F|x2 array of vectors per-face (defined in the local 2D basis for each face)
    :returns: The divergences as a length-|V| numpy array
    """
    raise ValueError("not yet implemented") 


def heat_method_distance_from_vertex(F,l,source_vert):
    """
    Use the Heat Method to compute geodesic distance along a surface from
    a source vertex.

    For reference, see "The Heat Method for Distance Computation", by Crane,
    Weischedel, Wardetzky (2017).

    The heat method uses the Laplace matrix as one of its main ingredients, so
    if the triangulation is intrinsic Delaunay, accuracy will be improved.

    :param F: |F|x3 vertex-face adjacency list F
    :param l: |F|x3 edge-lengths array, giving the length of each face-side
    :param source_vert: The index of a vertex to use as the source.
    :returns: The distances from the source vertex, as a length-|V| numpy array
    """
    raise ValueError("not yet implemented") 

##############################################################
### Run the code: compute distance
##############################################################

# Remember: choose what mesh to run on in the in the flipping example above

# Compute distance using the heat method, both before and after flipping
print("computing distance on original triangulation...")
dists_before = heat_method_distance_from_vertex(F,l,source_vert)
print("computing distance on Delaunay triangulation...")
dists_after = heat_method_distance_from_vertex(F_delaunay,l_delaunay,source_vert)

# Visualize the geodesic distances
# (click the 'enable' checkbox on the left sidebar to inspect the distances)
print("Visualizing in Polyscope window")
import polyscope as ps
ps.init()
ps_mesh = ps.register_surface_mesh("test mesh", V, F)
ps_mesh.add_distance_quantity("distance on initial triangulation", dists_before, enabled=True)
ps_mesh.add_distance_quantity("distance after Delaunay flips", dists_after)
ps.show()
