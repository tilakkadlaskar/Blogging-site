import { BlogPost } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "attention-is-all-you-need-revisited",
    title: "Revisiting Attention: A Geometric Perspective",
    date: "October 12, 2023",
    readTime: "8 min read",
    tags: ["Deep Learning", "Transformers", "Linear Algebra"],
    citationKey: "kadlaskar2023attention",
    abstract: "While the efficacy of the Transformer architecture is undeniable, the geometric intuition behind the self-attention mechanism often gets lost in implementation details. This note explores the attention matrix as a dynamic adjacency matrix in a graph neural network, highlighting the manifold hypothesis.",
    content: [
      {
        content: "The Scaled Dot-Product Attention is the core of the Transformer. Mathematically, we define queries $Q$, keys $K$, and values $V$. The operation is often described purely as a retrieval mechanism, but it is useful to view it as a kernel smoother."
      },
      {
        title: "The Attention Kernel",
        content: "If we consider the rows of $Q$ and $K$ as vectors in a high-dimensional space, the dot product $QK^T$ measures similarity. The softmax operation normalizes these similarities into a probability distribution. The scaling factor $\\sqrt{d_k}$ is crucial for gradient stability.",
        mathEq: "Attention(Q, K, V) = softmax(\\frac{QK^T}{\\sqrt{d_k}})V"
      },
      {
        content: "In my recent experiments, I found that visualizing the singular value spectrum of the attention matrix during training reveals a collapse in rank as the model overfits. This suggests that the 'expressivity' of the head decreases as it specializes.",
        codeBlock: `import torch
import torch.nn.functional as F

def scaled_dot_product(q, k, v, mask=None):
    d_k = q.size()[-1]
    scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    attention = F.softmax(scores, dim=-1)
    return torch.matmul(attention, v), attention`
      }
    ]
  },
  {
    id: "entropy-in-rl",
    title: "Entropy Regularization in Policy Gradients",
    date: "September 24, 2023",
    readTime: "12 min read",
    tags: ["Reinforcement Learning", "Information Theory"],
    citationKey: "kadlaskar2023entropy",
    abstract: "Exploration vs. Exploitation is the fundamental trade-off in RL. Entropy regularization adds a term to the loss function that encourages the policy to remain stochastic, preventing premature convergence to suboptimal deterministic policies.",
    content: [
      {
        content: "The standard objective in Reinforcement Learning is to maximize the expected cumulative reward. However, simply following the gradient of the reward can lead to mode collapse. By adding the entropy $H(\\pi(\\cdot|s_t))$ to the objective, we fundamentally alter the optimization landscape."
      },
      {
        title: "The Objective Function",
        content: "We modify the objective $J(\\theta)$ by adding an entropy bonus coefficient $\\beta$. This forces the agent to assign non-zero probability to actions, effectively smoothing the policy distribution.",
        mathEq: "J(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta} [\\sum_{t=0}^T r(s_t, a_t) + \\beta H(\\pi(\\cdot|s_t))]"
      },
      {
        content: "This formulation is intimately related to the path integral control and energy-based models. As $\\beta \\to 0$, we recover the standard RL objective. As $\\beta \\to \\infty$, the agent acts uniformly random."
      }
    ]
  },
  {
    id: "latent-space-topology",
    title: "Topology of High-Dimensional Latent Spaces",
    date: "August 05, 2023",
    readTime: "15 min read",
    tags: ["Topology", "Generative Models", "Mathematics"],
    citationKey: "kadlaskar2023topology",
    abstract: "Do Variational Autoencoders actually learn the manifold of the data? We apply persistent homology to the latent embeddings of MNIST digits to verify if the topological features (Betti numbers) of the dataset are preserved.",
    content: [
      {
        content: "A common assumption in manifold learning is that high-dimensional data lies on a low-dimensional manifold embedded in the ambient space. Autoencoders attempt to approximate the coordinate chart of this manifold."
      },
      {
        title: "Persistent Homology",
        content: "We use Vietoris-Rips complexes to compute the persistence diagrams of the latent space. Interestingly, we observe that 'holes' in the data topology often correspond to semantic ambiguities (e.g., a digit looking like both a 4 and a 9).",
        mathEq: "\\beta_k = \\text{rank}(H_k(X))"
      },
      {
        content: "The code below utilizes the 'gudhi' library to compute the persistence of the latent cloud. Note the stability of the 1-dimensional features.",
        codeBlock: `import gudhi
import numpy as np

def compute_persistence(point_cloud):
    rips_complex = gudhi.RipsComplex(points=point_cloud)
    simplex_tree = rips_complex.create_simplex_tree(max_dimension=2)
    diag = simplex_tree.persistence()
    return diag`
      }
    ]
  }
];
